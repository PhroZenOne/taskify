var Taskify;
(function (Taskify) {
    var Node = (function () {
        function Node(nodeId, children) {
            this.nodeId = nodeId;
            this.children = children;
        }
        Node.name = function () {
            return "ERROR!";
        };
        ;
        return Node;
    }());
    Taskify.Node = Node;
})(Taskify || (Taskify = {}));
