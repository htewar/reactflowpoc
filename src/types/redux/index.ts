export interface UtilsState {
    loaderState: boolean,
    messages: string[],
}

export type UtilsAction = {
    type: string;
}

export interface NodeState {}

export type NodesAction = {
    type: string;
}