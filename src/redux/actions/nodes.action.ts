import { Edge, Node, NodeChange } from "reactflow";
import { AddCurrentNodeAction, CustomNodeData, NodeStatus, PostResponseAssertionProps, PreRequestAssertionProps, RootState } from "../../types";
import { AnyAction, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { buildExecutionTree, filterEdges, getBodyKeyValue, getNodeFromID, getQueryKeyValue, getResponseKeyValue, trimExecutionTree } from "../../services";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { displayTerminalMessage, toggleTerminalDisplay } from "./utils.action";

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
export const ADD_REQUEST_PARAMS = "ADD_REQUEST_PARAMS";
export const REMOVE_REQUEST_PARAMS = "REMOVE_REQUEST_PARAMS";
export const UPDATE_REQUEST_PARAMS = "UPDATE_REQUEST_PARAMS";
export const ADD_API_RESPONSE = "ADD_API_RESPONSE";
export const REMOVE_API_RESPONSE = "REMOVE_API_RESPONSE";
export const ADD_RESPONSE_PARAMS = "ADD_RESPONSE_PARAMS";
export const UPDATE_RESPONSE_PARAMS = "UPDATE_RESPONSE_PARAMS";
export const REMOVE_RESPONSE_PARAMS = "REMOVE_RESPONSE_PARAMS";

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

export const AddPreRequestParams = (id: string, params: PreRequestAssertionProps) => {
    return {
        type: ADD_REQUEST_PARAMS,
        id,
        params,
    }
}

export const UpdatePreRequestParams = (params: PreRequestAssertionProps, paramPosition: number) => ({
    type: UPDATE_REQUEST_PARAMS,
    params,
    paramPosition,
})

export const RemovePreRequestParams = (paramPosition: number) => ({
    type: REMOVE_REQUEST_PARAMS,
    paramPosition,
})

export const AddPostResponseParams = (params: PostResponseAssertionProps, id: string) => ({
    type: ADD_RESPONSE_PARAMS,
    params,
    id,
})

export const UpdatePostResponseParams = (params: PostResponseAssertionProps, paramPosition: number) => ({
    type: UPDATE_RESPONSE_PARAMS,
    params,
    paramPosition,
})

export const RemovePostResponseParams = (paramPosition: number) => ({
    type: REMOVE_RESPONSE_PARAMS,
    paramPosition,
})

export const StartNodeExecution = (): ThunkAction<void, RootState, unknown, AnyAction> => async (dispatch: Dispatch, getState: () => RootState) => {
    try {
        // display output terminal to show api responses
        dispatch(toggleTerminalDisplay({ isInvert: true }))
        const { nodes: nodesState } = getState();
        const { nodes, edges, startNode } = nodesState;
        const filteredEdges = filterEdges(nodes, edges);
        const executionTree = buildExecutionTree(filteredEdges, "1");
        const filteredTree = trimExecutionTree(executionTree, startNode)
        // create a break point called outerloop to terminate execution in case of assertion failure
        outerLoop: for (const id of filteredTree) {
            const currentNode = nodes.find(node => node.id == id)
            dispatch(RemoveAPIResponse(id))
            dispatch(SetNodeStatus(id, NodeStatus.PROCESSING))
            if (currentNode) {
                dispatch(displayTerminalMessage({ message: "_________________________________________________________" }))
                dispatch(displayTerminalMessage({ message: `processing node ${currentNode.data.label}` }))
                const preAssertions = currentNode?.data.assertion?.preRequestAssertion;
                let preAssertionQueryString = "";
                let preAssertionBody = new Map<string, any>();
                if (preAssertions && !!preAssertions.length) {
                    for (const preAssertion of preAssertions) {
                        const prevNodeID = preAssertion.prevNodeName?.id;
                        if (prevNodeID) {
                            const getNode = getNodeFromID(nodes, prevNodeID)
                            if (getNode) {
                                let keyExist = false;
                                let keyValue;
                                // Get required prenode value based on the param position key
                                if (preAssertion.prevParamPosition == "Response") {
                                    const nodeResponse = getNode.data.metadata?.response;
                                    if (nodeResponse) [keyExist, keyValue] = getResponseKeyValue(nodeResponse, preAssertion.prevActionKey)
                                } else if (preAssertion.prevParamPosition == "Body") {
                                    const nodeBody = getNode.data.metadata?.body;
                                    if (nodeBody) [keyExist, keyValue] = getBodyKeyValue(nodeBody, preAssertion.prevActionKey)
                                } else if (preAssertion.prevParamPosition == "Query") {
                                    const nodeQuery = getNode.data.metadata?.params;
                                    if (nodeQuery) [keyExist, keyValue] = getQueryKeyValue(nodeQuery, preAssertion.prevActionKey)
                                }
                                // Display error if the prenode key does not exist at the provided location
                                if (!keyExist) {
                                    dispatch(displayTerminalMessage({
                                        message: `ERRROR: PREASSERTION FAILURE: key ${preAssertion.prevActionKey} does not exist on node ${getNode.data.label} at ${preAssertion.prevParamPosition}`
                                    }))
                                    dispatch(SetNodeStatus(id, NodeStatus.ERROR))
                                    break outerLoop;
                                }

                                // Attach the prenode value at the specified location
                                if (preAssertion.paramPosition == "Query")
                                    preAssertionQueryString += `${preAssertion.currentKey}=${keyValue}`
                                else if (preAssertion.paramPosition == "Body")
                                    preAssertionBody.set(preAssertion.currentKey, keyValue);
                                else if (preAssertion.paramPosition == "Route") {
                                    if (currentNode.data.metadata)
                                        currentNode.data.metadata.url = currentNode.data.metadata.url.replace(new RegExp(`{${preAssertion.currentKey}}`, 'g'), keyValue)
                                }
                            }
                        }
                    }
                    dispatch(displayTerminalMessage({ message: `PREASSERTION SUCCESS for ${currentNode.data.label}`}))
                }
                let headers: Record<string, string> = {};
                currentNode.data.metadata?.headers.forEach(header => {
                    headers[header.name] = header.value;
                })
                dispatch(displayTerminalMessage({ message: `setting headers ${JSON.stringify(headers)}` }))
                let queryParameters: Record<string, string | number | boolean | undefined> = {};
                currentNode.data.metadata?.params.forEach(param => {
                    queryParameters[param.name] = param.value;
                })
                const queryString = new URLSearchParams(
                    Object.entries(queryParameters)
                        .filter(([_, value]) => value !== undefined)
                        .map(([key, value]) => [key, String(value)])
                ).toString();
                dispatch(displayTerminalMessage({ message: `setting query string: ${JSON.stringify(queryString)}` }))
                const queryParams = [queryString, preAssertionQueryString].filter(Boolean).join("&");
                const url = queryParams ? `${currentNode.data.metadata?.url}?${queryParams}` : currentNode.data.metadata?.url;
                dispatch(displayTerminalMessage({ message: `URL: ${url}` }))
                dispatch(displayTerminalMessage({ message: `METHOD: ${currentNode.data.metadata?.method}` }))
                const body = currentNode.data.metadata?.body || {};
                const requestConfig: AxiosRequestConfig = {
                    method: currentNode.data.metadata?.method,
                    url,
                    headers,
                    data: {
                        ...body,
                        ...preAssertionBody
                    },
                }
                const result = await axios(requestConfig);
                if (result.status < 400 && result.status >= 200)
                    dispatch(SetNodeStatus(id, NodeStatus.SUCCESS))
                else dispatch(SetNodeStatus(id, NodeStatus.ERROR))
                dispatch(displayTerminalMessage({ message: "Response: " }))
                dispatch(displayTerminalMessage({ message: JSON.stringify(result.data, null, 1) }))
                dispatch(AddAPIResponse(result, id))
                const postAssertions = currentNode?.data.assertion?.postResponseAssertion;
                if (postAssertions && postAssertions.length) {
                    for (const postAssertion of postAssertions) {
                        let keyExist = false;
                        let keyValue;
                        [keyExist, keyValue] = getResponseKeyValue(result, postAssertion.key);
                        if (!keyExist) {
                            dispatch(displayTerminalMessage({
                                message: `ERRROR: POSTASSERTION FAILURE: key ${postAssertion.key} does not exist on node ${currentNode.data.label}`
                            }))
                            dispatch(SetNodeStatus(id, NodeStatus.ERROR))
                            break outerLoop;
                        }
                    }
                    dispatch(displayTerminalMessage({ message: `POSTASSERTION SUCCESS for ${currentNode.data.label}`}))
                }
            }
        }
    } catch (e) {
        console.log(e);
    }
}

export const AddAPIResponse = (response: AxiosResponse, nodeID: string) => ({
    type: ADD_API_RESPONSE,
    response,
    id: nodeID,

})

export const RemoveAPIResponse = (nodeID: string) => ({
    type: REMOVE_API_RESPONSE,
    id: nodeID
})