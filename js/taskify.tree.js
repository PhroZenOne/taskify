var Taskify;
(function (Taskify) {
    var Tree = (function () {
        function Tree(targetId, data, editor) {
            this.editor = editor;
            this.dataNodes = new Map();
            this.renderedNodes = new Map();
            this.renderedContainers = new Map();
            this.target = window.document.getElementById(targetId);
            this.data = data;
        }
        Tree.prototype.renderAll = function () {
            var _this = this;
            this.data.nodes.forEach(function (node) {
                _this.dataNodes.set(node.nodeId, node);
                _this.renderedNodes.set(node.nodeId, node.render());
            });
            this.prune();
            this.appendRecursive(this.data.rootNode, this.target);
        };
        Tree.prototype.prune = function () {
            var _this = this;
            var childToRemove = new Map();
            this.data.nodes.forEach(function (node) {
                var ret = _this.pruneRecursive(node, node.nodeId);
                ret.forEach(function (value, key) { return childToRemove.set(key, value); });
            });
            childToRemove.forEach(function (value, key) {
                console.warn("Found and ignored a cyclic dependency: " + key.toString() + " -> " + value.toString() + ".");
                var node = _this.dataNodes.get(key);
                node.children = node.children.filter(function (x) { return x != value; });
            });
        };
        Tree.prototype.pruneRecursive = function (node, targetId) {
            var _this = this;
            var childToRemove = new Map();
            node.children.forEach(function (child) {
                if (child.equals(targetId)) {
                    childToRemove.set(child, targetId);
                }
                var ret = _this.pruneRecursive(_this.dataNodes.get(child), targetId);
                ret.forEach(function (value, key) { return childToRemove.set(key, value); });
            });
            return childToRemove;
        };
        Tree.prototype.appendRecursive = function (nodeId, parent) {
            var _this = this;
            var nodeData = this.dataNodes.get(nodeId);
            var htmlNode = this.renderedNodes.get(nodeId);
            var container = new Taskify.NodeContainer(this, nodeData, htmlNode);
            this.renderedContainers.set(nodeId, container);
            parent.appendChild(container.getHtml());
            if (nodeData.children.length > 0) {
                nodeData.children.forEach(function (child) {
                    var li = container.createChildNode(child);
                    _this.appendRecursive(child, li);
                });
            }
        };
        Tree.prototype.addNode = function (parentId, node) {
            if (node.nodeId.equals(parentId)) {
                console.warn("You can't add a node to itself.");
            }
            var ancestors = this.getAllAncestors(parentId);
            if (ancestors.filter(function (x) { return x.equals(node.nodeId); }).length > 0) {
                console.warn("You can't add a node as a decendant of itself.");
                return false;
            }
            else {
                return true;
            }
        };
        Tree.prototype.deleteNode = function (nodeId) {
            var _this = this;
            if (nodeId.equals(this.data.rootNode)) {
                console.warn("Sorry, you can't delete the root node.");
                return false;
            }
            var node = this.dataNodes.get(nodeId);
            node.children.forEach(function (child) {
                _this.deleteNode(child);
            });
            this.renderedNodes.get(nodeId).remove();
            this.renderedNodes.delete(nodeId);
            this.renderedContainers.get(nodeId).remove();
            this.renderedContainers.delete(nodeId);
            var parent = this.getParent(nodeId);
            this.renderedContainers.get(parent).removeChildNode(nodeId);
            this.recursiveDeleteNode(nodeId, this.data.rootNode);
            this.dataNodes.delete(nodeId);
            this.data.nodes = this.data.nodes.filter(function (x) { return !x.nodeId.equals(nodeId); });
            console.log(JSON.stringify(this.data));
        };
        Tree.prototype.recursiveDeleteNode = function (nodeId, parent) {
            var _this = this;
            var node = this.dataNodes.get(parent);
            node.children = node.children.filter(function (x) { return !x.equals(nodeId); });
            node.children.forEach(function (child) {
                _this.recursiveDeleteNode(nodeId, child);
            });
        };
        Tree.prototype.editNode = function (nodeId) {
            var node = this.dataNodes.get(nodeId);
            var html = this.renderedNodes.get(nodeId);
            this.editor.editNode(html, node);
        };
        Tree.prototype.getAllAncestors = function (nodeId) {
            var parent = this.getParent(nodeId);
            var ancestors = this.getAllAncestors(parent);
            ancestors.push(parent);
            return ancestors;
        };
        Tree.prototype.getParent = function (nodeId) {
            var parent;
            this.dataNodes.forEach(function (value, key) {
                if (value.children.filter(function (x) { return x.equals(nodeId); }).length > 0) {
                    parent = key;
                }
            });
            return parent;
        };
        return Tree;
    }());
    Taskify.Tree = Tree;
})(Taskify || (Taskify = {}));
