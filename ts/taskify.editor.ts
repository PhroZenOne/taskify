module Taskify {
    export class Editor {

        editorTypes = [BasicNode];

        target: HTMLElement;

        constructor(targetId: string) {
            this.target = window.document.getElementById(targetId);
            this.target.innerHTML = "please select a node to edit";
        }

        editNode(htmlElement: HTMLDivElement, node: Node) {
            this.target.innerHTML = "";
            this.target.appendChild(this.nodeTypeSelector(node));
            this.target.appendChild(node.edit());
            this.target.appendChild(this.saveButton(htmlElement, node));
        }

        saveButton(htmlElement: HTMLDivElement, node: Node) {
            let saveButton = window.document.createElement('button');
            saveButton.innerHTML = "Save";
            return saveButton;
        }

        nodeTypeSelector(node: Node) {
            let selector = window.document.createElement('select');
            editorTypes.forEach(e => {

            })
        }
    }
}
