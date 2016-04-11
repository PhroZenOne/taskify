module Taskify {
    export class BasicNode extends Node {
        constructor(public description: string, public nodeId: System.Guid, public children: System.Guid[]) {
            super(nodeId, children);
        }

        static name(): string {
            return "Basic Node";
        }

        render(): HTMLDivElement {
            var container = window.document.createElement('div');
            container.classList.add("basic-node");
            container.innerHTML = this.description;
            return container;
        }

        edit(): HTMLDivElement {
            var container = window.document.createElement('div');
            container.classList.add("basic-node-editor");
            var inputField = window.document.createElement('input');
            inputField.type = "text";
            inputField.value = this.description;
            container.appendChild(inputField);
            return container;
        }
    }
}
