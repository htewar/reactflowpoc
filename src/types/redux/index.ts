import { Edge, Node, NodeChange } from "reactflow";
import { CustomNodeData } from "../drag-contents";

export interface UtilsState {
    loaderState: boolean,
    messages: string[],
}

export type UtilsAction = {
    type: string;
}

export interface NodeState {
    current: string | null;
    nodes: Node<CustomNodeData>[];
    edges: Edge[];
}

export type NodesAction = {
    type: string;
    id?: string;
    node: Node<CustomNodeData>;
    changes: NodeChange[];
    metadata: CustomNodeData;
}

export type AddCurrentNodeAction = {
    id: string;
}

export type RootState = {
    nodes: NodeState,
    utils: UtilsState,
}