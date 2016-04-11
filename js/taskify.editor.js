var Taskify;
(function (Taskify) {
    var Editor = (function () {
        function Editor(targetId) {
            this.editorTypes = [Taskify.BasicNode];
            this.target = window.document.getElementById(targetId);
            this.target.innerHTML = "please select a node to edit";
        }
        Editor.prototype.editNode = function (htmlElement, node) {
            this.target.innerHTML = "";
            this.target.appendChild(this.nodeTypeSelector(node));
            this.target.appendChild(node.edit());
            this.target.appendChild(this.saveButton(htmlElement, node));
        };
        Editor.prototype.saveButton = function (htmlElement, node) {
            var saveButton = window.document.createElement('button');
            saveButton.innerHTML = "Save";
            return saveButton;
        };
        Editor.prototype.nodeTypeSelector = function (node) {
            var selector = window.document.createElement('select');
            editorTypes.forEach(function (e) {
            });
        };
        return Editor;
    }());
    Taskify.Editor = Editor;
})(Taskify || (Taskify = {}));
