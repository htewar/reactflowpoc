import { MetadataState } from "../pages";

export type DraggableItem = {
    itemId: string;
}

export enum NodeStatus {
    IDLE = "IDLE",
    PROCESSING = "PROCESSING",
    SUCCESS = "SUCCESS",
    ERROR = "ERROR",
}

export type CustomNodeData = {
    identifier: string;
    label: string;
    icon: string;
    status: NodeStatus;
    metadata?: MetadataState
}