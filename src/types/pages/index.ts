import { Dispatch } from "redux"
import { CustomNodeData } from "../drag-contents";
import { Edge, Node } from "reactflow";
import { KeyValueProps } from "../components";

export type DraftProps = {
    dispatch: Dispatch;
    nodes: Node<CustomNodeData>[];
    edges: Edge[];
}

export type PanelProps = {
    nodes: Node<CustomNodeData>[];
    isNodeSelected: string | null;
    dispatch: Dispatch;
}

export type NodeMetadataProps = {
    selectedNode: Node<CustomNodeData> | null;
    onDeleteNode: () => void;
    onSaveNode: (params: NodeParams) => void;
}

export type NodeParams = {
    name: string;
    metadata: MetadataState;
}

export type MetadataState = {
    method?: HTTPMethod,
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

export type ComparisonType = {
    Equal: "==",
    NotEqual: "!=",
    GreaterThan: ">",
    GreaterThanOrEqualTo: ">=",
    LessThan: "<",
    LessThanOrEqualTo: "<=",
}

export type AssertionParams = {
    property: string;
    comparison?: ComparisonType;
    objectPath: string;
}