module Taskify {
    export class Root {
        constructor(public owner: User, public rootNode: System.Guid, public nodes: Node[]) { }
    }
}
