import { applyNodeChanges, Edge } from "reactflow";
import { NodesAction, NodeState } from "../../types"
import { ADD_CURRENT_NODE, ADD_EDGE, ADD_NODE, ADD_NODE_START_POINT, REMOVE_CURRENT_NODE, REMOVE_EDGES, REMOVE_NODE, REMOVE_START_NODE_PONT, REPLACE_NODES, SAVE_NODE_METADATA } from "../actions/nodes.action";

const nodesReducerDefaultState: NodeState = {
    current: null,
    startNode: "",
    nodes: [],
    edges: [],
}

const nodesReducer = (state: NodeState = nodesReducerDefaultState, { type, id, node, edge, changes, metadata }: NodesAction) => {
    switch (type) {
        case ADD_CURRENT_NODE:
            return {...state, current: id }
        case REMOVE_CURRENT_NODE:
            return { ...state, current: null }
        case ADD_NODE:
            return { ...state, nodes: [...state.nodes, node]}
        case REMOVE_NODE:
            const position = state.nodes.findIndex((n) => n.id == id?.toString())
            return { ...state, nodes: [...state.nodes.slice(0, position), ...state.nodes.slice(position + 1)]}
        case SAVE_NODE_METADATA:
            const pos = state.nodes.findIndex((n) => n.id == id?.toString());
            const currentNodes = state.nodes;
            if (metadata.metadata)
                currentNodes[pos].data = { label: metadata.label, icon: metadata.icon, identifier: metadata.identifier, metadata: metadata.metadata }
            return { ...state, nodes: currentNodes }
        case REPLACE_NODES:
            return { ...state, nodes: applyNodeChanges(changes, state.nodes) }
        case ADD_EDGE:
            return { ...state, edges: [...state.edges, edge]}
        case REMOVE_EDGES:
            const idString = id?.toString();
            const edgesCopy:Edge[] = JSON.parse(JSON.stringify(state.edges));
            const edgesFilter = edgesCopy.filter(edge => edge.source != idString && edge.target != idString) || [];
            return { ...state, edges: edgesFilter }
        case ADD_NODE_START_POINT:
            return { ...state, startNode: id }
        case REMOVE_START_NODE_PONT:
            return { ...state, startNode: "" }
        default:
            return state;
    }
}

export default nodesReducer;