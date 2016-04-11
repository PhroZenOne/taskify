var Taskify;
(function (Taskify) {
    var NodeContainer = (function () {
        function NodeContainer(tree, node, htmlNode) {
            this.childrenList = new Map();
            this.tree = tree;
            this.nodeId = node.nodeId;
            this.htmlNode = htmlNode;
            this.outerContainer = window.document.createElement('div');
            this.outerContainer.classList.add("outer-container");
            this.innerContainer = window.document.createElement('div');
            this.innerContainer.classList.add("inner-container");
            this.innerContainer.appendChild(htmlNode);
            this.outerContainer.appendChild(this.innerContainer);
            this.addControls();
            this.children = window.document.createElement('ul');
            if (node.children.length > 0) {
                this.outerContainer.appendChild(this.children);
            }
        }
        NodeContainer.prototype.remove = function () {
        };
        NodeContainer.prototype.addControls = function () {
            var _this = this;
            var controls = window.document.createElement('div');
            controls.classList.add("controls");
            this.outerContainer.appendChild(controls);
            var deleteNodeButton = window.document.createElement('button');
            deleteNodeButton.innerHTML = "Delete Node (and all decendants)";
            deleteNodeButton.onclick = function () {
                _this.tree.deleteNode(_this.nodeId);
            };
            controls.appendChild(deleteNodeButton);
            var newChildNode = window.document.createElement('button');
            newChildNode.innerHTML = "New Child Node";
            controls.appendChild(newChildNode);
            var editNode = window.document.createElement('button');
            editNode.innerHTML = "Edit node";
            editNode.onclick = function () {
                _this.tree.editNode(_this.nodeId);
            };
            controls.appendChild(editNode);
        };
        NodeContainer.prototype.getHtml = function () {
            return this.outerContainer;
        };
        NodeContainer.prototype.updateNode = function (htmlNode) {
            this.innerContainer.replaceChild(htmlNode, this.htmlNode);
            this.htmlNode = htmlNode;
        };
        NodeContainer.prototype.createChildNode = function (nodeId) {
            if (this.childrenList.size == 0) {
                this.outerContainer.appendChild(this.children);
            }
            var listItem = window.document.createElement('li');
            listItem.id = "li-for-" + nodeId.toString();
            this.childrenList.set(nodeId, listItem);
            this.children.appendChild(listItem);
            return listItem;
        };
        NodeContainer.prototype.removeChildNode = function (nodeId) {
            this.childrenList.get(nodeId).remove();
            this.childrenList.delete(nodeId);
            if (this.childrenList.size == 0) {
                this.outerContainer.removeChild(this.children);
            }
        };
        return NodeContainer;
    }());
    Taskify.NodeContainer = NodeContainer;
})(Taskify || (Taskify = {}));
