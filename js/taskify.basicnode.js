var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Taskify;
(function (Taskify) {
    var BasicNode = (function (_super) {
        __extends(BasicNode, _super);
        function BasicNode(description, nodeId, children) {
            _super.call(this, nodeId, children);
            this.description = description;
            this.nodeId = nodeId;
            this.children = children;
        }
        BasicNode.name = function () {
            return "Basic Node";
        };
        BasicNode.prototype.render = function () {
            var container = window.document.createElement('div');
            container.classList.add("basic-node");
            container.innerHTML = this.description;
            return container;
        };
        BasicNode.prototype.edit = function () {
            var container = window.document.createElement('div');
            container.classList.add("basic-node-editor");
            var inputField = window.document.createElement('input');
            inputField.type = "text";
            inputField.value = this.description;
            container.appendChild(inputField);
            return container;
        };
        return BasicNode;
    }(Taskify.Node));
    Taskify.BasicNode = BasicNode;
})(Taskify || (Taskify = {}));
