module Taskify {
    export class Tree {

        target: HTMLElement;

        data: Root;

        // a quicker way to get each node instead of traversing the tree.
        // key = nodeid
        dataNodes = new Map<System.Guid, Node>();
        renderedNodes = new Map<System.Guid, HTMLDivElement>();
        renderedContainers = new Map<System.Guid, NodeContainer>();

        constructor(targetId: string, data: Root, private editor: Editor) {
            this.target = window.document.getElementById(targetId);
            this.data = data;
        }

        renderAll() {
            //first render each node
            this.data.nodes.forEach(node => {
                this.dataNodes.set(node.nodeId, node);
                this.renderedNodes.set(node.nodeId, node.render());
            });

            //prune tree from any node that is under itself.
            //for safty, this should not be needed but better save than sorry.
            this.prune();

            //then connect the rendered nodes by recursivly traversing the data tree
            this.appendRecursive(this.data.rootNode, this.target);
        }

        prune() {
            var childToRemove = new Map<System.Guid, System.Guid>();

            this.data.nodes.forEach(node => {
                var ret = this.pruneRecursive(node, node.nodeId);
                ret.forEach((value, key) => childToRemove.set(key, value));
            });

            childToRemove.forEach((value, key) => {
                console.warn("Found and ignored a cyclic dependency: " + key.toString() + " -> " + value.toString() + ".");
                var node = this.dataNodes.get(key)
                node.children = node.children.filter(x => x != value);
            });
        }

        pruneRecursive(node: Node, targetId: System.Guid): Map<System.Guid, System.Guid> {
            var childToRemove = new Map<System.Guid, System.Guid>();
            node.children.forEach(child => {
                if (child.equals(targetId)) {
                    childToRemove.set(child, targetId);
                }
                var ret = this.pruneRecursive(this.dataNodes.get(child), targetId);
                ret.forEach((value, key) => childToRemove.set(key, value));
            });
            return childToRemove;
        }

        appendRecursive(nodeId: System.Guid, parent: HTMLElement) {
            var nodeData = this.dataNodes.get(nodeId);
            var htmlNode = this.renderedNodes.get(nodeId);
            var container = new NodeContainer(this, nodeData, htmlNode);
            this.renderedContainers.set(nodeId, container);
            parent.appendChild(container.getHtml());

            if (nodeData.children.length > 0) {
                nodeData.children.forEach((child) => {
                    var li = container.createChildNode(child);
                    this.appendRecursive(child, li);
                });
            }
        }

        addNode(parentId: System.Guid, node: Node): boolean {
            if (node.nodeId.equals(parentId)) {
                console.warn("You can't add a node to itself.")
            }
            var ancestors = this.getAllAncestors(parentId);
            if (ancestors.filter(x => x.equals(node.nodeId)).length > 0) {
                console.warn("You can't add a node as a decendant of itself.")
                return false;
            } else {
                return true;
            }
        }

        deleteNode(nodeId: System.Guid): boolean {
            if (nodeId.equals(this.data.rootNode)) {
                console.warn("Sorry, you can't delete the root node.");
                return false;
            }
            //first always remove the children.
            var node = this.dataNodes.get(nodeId);
            node.children.forEach(child => {
                this.deleteNode(child);
            });

            //delete the quick references.
            this.renderedNodes.get(nodeId).remove();
            this.renderedNodes.delete(nodeId);
            this.renderedContainers.get(nodeId).remove();
            this.renderedContainers.delete(nodeId);

            //remove the li, it is part of the parent.
            var parent = this.getParent(nodeId);
            this.renderedContainers.get(parent).removeChildNode(nodeId);

            //walk the tree and remove all references to the node.
            this.recursiveDeleteNode(nodeId, this.data.rootNode);
            this.dataNodes.delete(nodeId);

            //and remove it for real from the nodes list.
            this.data.nodes = this.data.nodes.filter(x => !x.nodeId.equals(nodeId));

            console.log(JSON.stringify(this.data));
        }

        recursiveDeleteNode(nodeId, parent) {
            var node = this.dataNodes.get(parent);
            node.children = node.children.filter(x => !x.equals(nodeId));
            node.children.forEach(child => {
                this.recursiveDeleteNode(nodeId, child);
            });
        }

        editNode(nodeId: System.Guid) {
            var node = this.dataNodes.get(nodeId);
            var html = this.renderedNodes.get(nodeId);
            this.editor.editNode(html, node);
        }

        getAllAncestors(nodeId: System.Guid): System.Guid[] {
            var parent = this.getParent(nodeId);
            var ancestors = this.getAllAncestors(parent);
            ancestors.push(parent);
            return ancestors;
        }

        getParent(nodeId: System.Guid): System.Guid {
            var parent;
            this.dataNodes.forEach((value, key) => {
                if (value.children.filter(x => x.equals(nodeId)).length > 0) {
                    //TODO: when I have internet, lets se how to exit this loop. :P
                    //Also, this does not scale well.. :&
                    parent = key;
                }
            });
            return parent;
        }
    }
}
