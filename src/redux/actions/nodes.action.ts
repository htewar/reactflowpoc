import { Edge, Node, NodeChange } from "reactflow";
import { AddCurrentNodeAction, CustomNodeData } from "../../types";

export const ADD_CURRENT_NODE = "ADD_CURRENT_NODE";
export const REMOVE_CURRENT_NODE = "REMOVE_CURRENT_NODE";
export const ADD_NODE = "ADD_NODE";
export const REMOVE_NODE = "REMOVE_NODE";
export const REPLACE_NODES = "REPLACE_NODES";
export const SAVE_NODE_METADATA = "SAVE_NODE_METADATA";
export const ADD_EDGE = "ADD_EDGE"

export const addCurrentNode = ({ id }: AddCurrentNodeAction) => ({
    id,
    type: ADD_CURRENT_NODE
})

export const removeCurrentNode = () => ({
    type: REMOVE_CURRENT_NODE
})

export const AddNode = (node: Node<CustomNodeData>) => ({
    type: ADD_NODE,
    node,
})

export const RemoveNode = (id: number) => ({
    type: REMOVE_NODE,
    id
})

export const ReplaceNodes = (changes: NodeChange[]) => ({
    type: REPLACE_NODES,
    changes,
})

export const OnSaveNodeMetadata = (id: number, metadata: CustomNodeData) => ({
    type: SAVE_NODE_METADATA,
    id,
    metadata,
})

export const AddEdge = (edge: Edge) => ({
    type: ADD_EDGE,
    edge
})