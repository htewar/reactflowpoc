import { Edge, Node } from "reactflow";
import { CustomNodeData, KeyValueProps } from "../types";
import { AxiosResponse } from "axios";

export const filterEdges = (nodes: Node<CustomNodeData>[], edges: Edge[]): Edge[] => {
    const nodeMap = new Map<string, string>();
    nodes.forEach(node => nodeMap.set(node.id, node.data.identifier));
    return edges.filter(({source, target}) =>  (nodeMap.get(source) === "1" && nodeMap.get(target) === "1"))
}

export const isStartNode = (connections: Edge[], id: string | null): boolean => {
    if (id) {
        const isTarget = connections.some(connection => connection.target === id);
        if (isTarget) return false;
        return connections.some(connection => connection.source === id)
    }
    return false;
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

export const getPreAssertionNodes = (connections: Edge[], id: string): string[] => {
    const connectedNodes: Set<string> = new Set();
    const queue: string[] = [];
    queue.push(id);
    while (queue.length > 0) {
        const currentNode = queue.shift();
        if (!currentNode) continue;

        connections.forEach(({ source, target }) => {
            if (target === currentNode && !connectedNodes.has(source)) {
                connectedNodes.add(source);
                queue.push(source);
            }
        });
    }
    return Array.from(connectedNodes).reverse();
}

export const getNodeFromID = (nodes: Node<CustomNodeData>[], id: string):Node<CustomNodeData> | undefined => nodes.find(n => n.id == id);

export const getResponseKeyValue = (response: AxiosResponse, location: string): [boolean, any] => {
    const keys = location.split(".");
    let value: any = response;
    for (const key of keys) {
        if (value && typeof value === "object" && key in value)
            value = value[key];
        else return [false, undefined]; 
    }
    return [true, value];
}

export const getQueryKeyValue = (query: KeyValueProps[], key: string): [boolean, any] => {
    const kvMap = new Map<string, string>();
    query.forEach(({name, value}) => kvMap.set(name, value));
    return kvMap.has(key) ? [true, kvMap.get(key)]: [false, ""];
}

export const getBodyKeyValue = (body: string, key: string): [boolean, any] => {
    try {
        const parsedJSON = JSON.parse(body)
        return key in parsedJSON? [true, parsedJSON[key]]: [false, ""]
    } catch(e) {
        return [false, ""]
    }
}

export const runAssertions = () => {}

export const runModifiers = () => {}
