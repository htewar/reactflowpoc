import { Dispatch } from "redux"
import { CustomNodeData } from "../drag-contents";
import { Node } from "reactflow";
import { KeyValueProps } from "../components";

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

export type NodeParams = {
    name: string;
    metadata: MetadataState;
}

export type MetadataState = {
    method: HTTPMethod | null,
    url: string,
    params: KeyValueProps[],
    headers: KeyValueProps[],
}

export enum HTTPMethod {
    GET = "GET",
    PUT = "PUT",
    PATCH = "PATCH",
    POST = "POST",
    DELETE = "DELETE",
}