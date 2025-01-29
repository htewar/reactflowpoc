import { applyNodeChanges } from "reactflow";
import { NodesAction, NodeState } from "../../types"
import { ADD_CURRENT_NODE, ADD_EDGE, ADD_NODE, REMOVE_CURRENT_NODE, REMOVE_NODE, REPLACE_NODES, SAVE_NODE_METADATA } from "../actions/nodes.action";

const nodesReducerDefaultState: NodeState = {
    current: null,
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
            if (metadata.metadata){
                currentNodes[pos].data = { label: metadata.label, icon: metadata.icon, metadata: metadata.metadata }
            }
            return { ...state, nodes: currentNodes }
        case REPLACE_NODES:
            return { ...state, nodes: applyNodeChanges(changes, state.nodes) }
        case ADD_EDGE:
            return { ...state, edges: [...state.edges, edge]}
        default:
            return state;
    }
}

export default nodesReducer;