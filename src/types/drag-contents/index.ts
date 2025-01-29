import { MetadataState } from "../pages";

export type DraggableItem = {
    itemId: string;
}

export type CustomNodeData = {
    label: string;
    icon: string;
    metadata?: MetadataState
}