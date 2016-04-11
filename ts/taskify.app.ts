module Taskify {
    window.onload = () => {
        console.log("Starting!");
        var nodes = [];
        var rootNodeId = System.Guid.MakeNew();
        var childOneId = System.Guid.MakeNew();
        var childTwoId = System.Guid.MakeNew();
        var subChildOneId = System.Guid.MakeNew();

        var user = new User("phrozen", "Mikael Berglund");

        var rootNode = new BasicNode("root node", rootNodeId, [childOneId, childTwoId]);
        var childOne = new BasicNode("child one", childOneId, [subChildOneId]);
        var subChildOne = new BasicNode("sub child one", subChildOneId, []);
        var childTwo = new BasicNode("child two", childTwoId, []);

        nodes.push(rootNode);
        nodes.push(childOne);
        nodes.push(childTwo);
        nodes.push(subChildOne);

        var treeData = new Root(user, rootNodeId, nodes);
        var editor = new Editor("taskify-editor");
        var tree = new Tree("taskify-tree", treeData, editor);
        tree.renderAll();

    };
}
