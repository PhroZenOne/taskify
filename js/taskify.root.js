var Taskify;
(function (Taskify) {
    var Root = (function () {
        function Root(owner, rootNode, nodes) {
            this.owner = owner;
            this.rootNode = rootNode;
            this.nodes = nodes;
        }
        return Root;
    }());
    Taskify.Root = Root;
})(Taskify || (Taskify = {}));
