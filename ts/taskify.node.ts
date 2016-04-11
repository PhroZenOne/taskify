module Taskify {
    export abstract class Node {
        constructor(public nodeId: System.Guid, public children: System.Guid[]) { }
        abstract render(): HTMLDivElement;
        abstract edit(): HTMLDivElement;
        static name(): string {
            return "ERROR!";
        };
    }
}
