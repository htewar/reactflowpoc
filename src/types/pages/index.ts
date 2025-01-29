import { Dispatch } from "redux"
import { CustomNodeData } from "../drag-contents";
import { Node } from "reactflow";

export type DraftProps = {
    dispatch: Dispatch;
    nodes: Node<CustomNodeData>[];
}

export type PanelProps = {
    isNodeSelected: string | null;
    dispatch: Dispatch;
}

export type NodeMetadataProps = {
    onDeleteNode: () => void;
}