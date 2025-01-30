import { MetadataState } from "../pages";

export type DraggableItem = {
    itemId: string;
}

export type CustomNodeData = {
    identifier: string;
    label: string;
    icon: string;
    metadata?: MetadataState
}