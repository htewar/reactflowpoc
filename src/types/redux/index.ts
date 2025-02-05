import { Edge, Node, NodeChange } from "reactflow";
import { CustomNodeData, NodeStatus } from "../drag-contents";
import { store } from "../../redux/store/configureStore";
import { PreRequestAssertionProps } from "../pages";

export interface UtilsState {
    loaderState: boolean,
    messages: string[],
}

export type UtilsAction = {
    type: string;
}

export interface NodeState {
    current: string | null;
    startNode: string;
    nodes: Node<CustomNodeData>[];
    edges: Edge[];
}

export type NodesAction = {
    type: string;
    id?: string;
    node: Node<CustomNodeData>;
    edge: Edge;
    changes: NodeChange[];
    metadata: CustomNodeData;
    status?: NodeStatus;
    params?: PreRequestAssertionProps;
}

export type AddCurrentNodeAction = {
    id: string;
}

export type RootState = {
    nodes: NodeState,
    utils: UtilsState,
}

export type AppDispatch = typeof store.dispatch;