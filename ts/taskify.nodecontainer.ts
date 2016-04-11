module Taskify {
    export class NodeContainer {

        children: HTMLUListElement;
        outerContainer: HTMLDivElement;
        innerContainer: HTMLDivElement;
        childrenList = new Map<System.Guid, HTMLLIElement>();
        htmlNode: HTMLDivElement;
        tree: Tree;
        nodeId: System.Guid;

        constructor(tree: Tree, node: Node, htmlNode: HTMLDivElement) {
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

        remove() {

        }

        addControls() {
            var controls = window.document.createElement('div');
            controls.classList.add("controls");
            this.outerContainer.appendChild(controls);

            var deleteNodeButton = window.document.createElement('button');
            deleteNodeButton.innerHTML = "Delete Node (and all decendants)";
            deleteNodeButton.onclick = () => {
                this.tree.deleteNode(this.nodeId);
            }
            controls.appendChild(deleteNodeButton);

            var newChildNode = window.document.createElement('button');
            newChildNode.innerHTML = "New Child Node";
            controls.appendChild(newChildNode);

            var editNode = window.document.createElement('button');
            editNode.innerHTML = "Edit node";
            editNode.onclick = () => {
                this.tree.editNode(this.nodeId);
            }
            controls.appendChild(editNode);
        }

        getHtml() {
            return this.outerContainer;
        }

        updateNode(htmlNode: HTMLDivElement) {
            this.innerContainer.replaceChild(htmlNode, this.htmlNode);
            this.htmlNode = htmlNode;
        }

        createChildNode(nodeId: System.Guid): HTMLLIElement {
            if (this.childrenList.size == 0) {
                this.outerContainer.appendChild(this.children);
            }
            var listItem = window.document.createElement('li');
            listItem.id = "li-for-" + nodeId.toString();
            this.childrenList.set(nodeId, listItem);
            this.children.appendChild(listItem);
            return listItem;
        }

        removeChildNode(nodeId: System.Guid) {
            this.childrenList.get(nodeId).remove();
            this.childrenList.delete(nodeId);
            if (this.childrenList.size == 0) {
                this.outerContainer.removeChild(this.children);
            }
        }
    }
}
