import { Edge, Node } from "reactflow";
import { CustomNodeData } from "../types";

export const filterEdges = (nodes: Node<CustomNodeData>[], edges: Edge[]): Edge[] => {
    const nodeMap = new Map<string, string>();
    nodes.forEach(node => nodeMap.set(node.id, node.data.identifier));
    return edges.filter(({source, target}) =>  (nodeMap.get(source) === "1" && nodeMap.get(target) === "1"))
}

export const isStartNode = (connections: Edge[], id: string): boolean => {
    const isTarget = connections.some(connection => connection.target === id);
    if (isTarget) return false;
    return connections.some(connection => connection.source === id)
}

export const buildExecutionTree = (edges: Edge[], position: string): string[] => {
    const graph = new Map<string, string>();
    edges.forEach(({ source, target }) => graph.set(source, target));
    const executionOrder: string[] = [];
    let current = position;
    while (graph.has(current)) {
        executionOrder.push(current);
        current = graph.get(current)!;
    }
    executionOrder.push(current);
    return executionOrder;
};

export const trimExecutionTree = (tree: string[], id: string): string[] => {
    const index = tree.indexOf(id);
    return index !== -1 ? tree.slice(index) : [];
}

export const runAssertions = () => {}

export const runModifiers = () => {}
