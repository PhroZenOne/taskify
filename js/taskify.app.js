var Taskify;
(function (Taskify) {
    window.onload = function () {
        console.log("Starting!");
        var nodes = [];
        var rootNodeId = System.Guid.MakeNew();
        var childOneId = System.Guid.MakeNew();
        var childTwoId = System.Guid.MakeNew();
        var subChildOneId = System.Guid.MakeNew();
        var user = new Taskify.User("phrozen", "Mikael Berglund");
        var rootNode = new Taskify.BasicNode("root node", rootNodeId, [childOneId, childTwoId]);
        var childOne = new Taskify.BasicNode("child one", childOneId, [subChildOneId]);
        var subChildOne = new Taskify.BasicNode("sub child one", subChildOneId, []);
        var childTwo = new Taskify.BasicNode("child two", childTwoId, []);
        nodes.push(rootNode);
        nodes.push(childOne);
        nodes.push(childTwo);
        nodes.push(subChildOne);
        var treeData = new Taskify.Root(user, rootNodeId, nodes);
        var editor = new Taskify.Editor("taskify-editor");
        var tree = new Taskify.Tree("taskify-tree", treeData, editor);
        tree.renderAll();
    };
})(Taskify || (Taskify = {}));
