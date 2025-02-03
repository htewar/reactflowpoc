import { Edge, Node, NodeChange } from "reactflow";
import { AddCurrentNodeAction, CustomNodeData, NodeStatus, RootState } from "../../types";
import { AnyAction, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { buildExecutionTree, filterEdges } from "../../services";
import axios, { AxiosRequestConfig } from "axios";
import { trimExecutionTree } from "../../services/execution";

export const ADD_CURRENT_NODE = "ADD_CURRENT_NODE";
export const REMOVE_CURRENT_NODE = "REMOVE_CURRENT_NODE";
export const ADD_NODE = "ADD_NODE";
export const REMOVE_NODE = "REMOVE_NODE";
export const REPLACE_NODES = "REPLACE_NODES";
export const SAVE_NODE_METADATA = "SAVE_NODE_METADATA";
export const ADD_EDGE = "ADD_EDGE"
export const REMOVE_EDGES = "REMOVE_EDGES";
export const ADD_NODE_START_POINT = "ADD_NODE_START_POINT";
export const REMOVE_START_NODE_PONT = "REMOVE_START_NODE_POINT";
export const SET_NODE_STATUS = "SET_NODE_STATUS";

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

export const RemoveEdges = (id: number) => ({
    type: REMOVE_EDGES,
    id,
})

export const AddNodeStartPoint = (id: string) => ({
    type: ADD_NODE_START_POINT,
    id,
})

export const RemoveStartNodePoint = () => ({
    type: REMOVE_START_NODE_PONT
})

export const SetNodeStatus = (id: string, status: NodeStatus) => ({
    type: SET_NODE_STATUS,
    id,
    status,
})

export const StartNodeExecution = (): ThunkAction<void, RootState, unknown, AnyAction> => async (dispatch: Dispatch, getState: () => RootState) => {
    try {
        const { nodes: nodesState } = getState();
        const { nodes, edges, startNode } = nodesState;
        const filteredEdges = filterEdges(nodes, edges);
        const executionTree = buildExecutionTree(filteredEdges, "1");
        const filteredTree = trimExecutionTree(executionTree, startNode)
        for (const id of filteredTree) {
            const currentNode = nodes.find(node => node.id == id)
            dispatch(SetNodeStatus(id, NodeStatus.PROCESSING))
            if (currentNode) {
                let headers: Record<string, string> = {};
                currentNode.data.metadata?.headers.forEach(header => {
                    headers[header.name] = header.value;
                })

                let queryParameters: Record<string, string | number | boolean | undefined> = {};
                currentNode.data.metadata?.params.forEach(param => {
                    queryParameters[param.name] = param.value;
                })
                const queryString = new URLSearchParams(
                    Object.entries(queryParameters)
                        .filter(([_, value]) => value !== undefined)
                        .map(([key, value]) => [key, String(value)])
                ).toString();
                const url = queryString ? `${currentNode.data.metadata?.url}?${queryString}` : currentNode.data.metadata?.url;
                const requestConfig: AxiosRequestConfig = {
                    method: currentNode.data.metadata?.method,
                    url,
                    headers,
                }
                const result = await axios(requestConfig);
                if (result.status < 400 && result.status >= 200)
                    dispatch(SetNodeStatus(id, NodeStatus.SUCCESS))
                else dispatch(SetNodeStatus(id, NodeStatus.ERROR))
                console.log(result.data, result.status);
            }
        }
    } catch (e) {
        console.log(e);
    }
}