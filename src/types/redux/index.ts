import { Edge, Node, NodeChange } from "reactflow";
import { CustomNodeData, NodeStatus } from "../drag-contents";
import { store } from "../../redux/store/configureStore";
import { PostResponseAssertionProps, PreRequestAssertionProps } from "../pages";
import { AxiosResponse } from "axios";

export interface UtilsState {
    loaderState: boolean,
    isTerminalDisplayed: boolean,
    terminalDisplayMessages: string[],
    messages: string[],
}

export type UtilsAction = {
    type: string;
    isInvert?: boolean;
    message: string;
    count: number;
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
    ids: string[];
    node: Node<CustomNodeData>;
    edge: Edge;
    changes: NodeChange[];
    metadata: CustomNodeData;
    rate?: number;
    status?: NodeStatus;
    params?: PreRequestAssertionProps | PostResponseAssertionProps;
    paramPosition?: number;
    response?: AxiosResponse;
}

export type AddCurrentNodeAction = {
    id: string;
}

export type RootState = {
    nodes: NodeState,
    utils: UtilsState,
}

export type AppDispatch = typeof store.dispatch;