import { Dispatch } from "redux"
import { CustomNodeData } from "../drag-contents";
import { Edge, Node } from "reactflow";
import { KeyValueProps } from "../components";
import { AxiosResponse } from "axios";

export type DraftProps = {
    dispatch: Dispatch;
    nodes: Node<CustomNodeData>[];
    edges: Edge[];
}

export type PanelProps = {
    nodes: Node<CustomNodeData>[];
    isNodeSelected: string | null;
    dispatch: Dispatch;
    connections: Edge[];
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
    body?: string,
    url: string,
    params: KeyValueProps[],
    headers: KeyValueProps[],
    response?: AxiosResponse,
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
    preRequestAssertion: PreRequestAssertionProps[];
    postResponseAssertion: PostResponseAssertionProps[];
}

export type MappingKey = "typeConversion" | "codeConversion" | "";

export type ParameterPlacementKey = "Body" | "Query" | "Response" | "Route" | "";

export type AssertionCondition = "Not Nil" | "Not Empty" | "Greater Than" | "Greater Than OR Equal To" | "Equal To" | "Less Than" | "Less Than OR Equal To" | "";

export type Mapping = {
    key: MappingKey;
    value: string;
}

export type MappingError = {
    key: string;
    value: string;
}

export type PreRequestAssertionProps = {
    currentKey: string;
    paramPosition: ParameterPlacementKey;
    prevActionKey: string;
    prevParamPosition: ParameterPlacementKey;
    prevNodeName?: Node<CustomNodeData>;
    mapping: Mapping;
    updateIndex?: number | null;
    isSelected?: boolean;
    isDataMapping: boolean;
    onAssertionClick?: () => void;
}

export type PreRequestAssertionError = {
    currentKey?: string;
    paramPosition?: string;
    prevActionKey?: string;
    prevParamPosition?: string;
    prevNodeName?: string;
    mapping?: MappingError;
}

export type PostResponseAssertionProps = {
    key: string;
    condition: AssertionCondition;
    value?: any;
}