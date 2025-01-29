import { applyNodeChanges } from "reactflow";
import { NodesAction, NodeState } from "../../types"
import { ADD_CURRENT_NODE, ADD_NODE, REMOVE_CURRENT_NODE, REMOVE_NODE, REPLACE_NODES } from "../actions/nodes.action";

const nodesReducerDefaultState: NodeState = {
    current: null,
    nodes: [],
    edges: [],
}

const nodesReducer = (state: NodeState = nodesReducerDefaultState, { type, id, node, position, changes }: NodesAction) => {
    switch (type) {
        case ADD_CURRENT_NODE:
            return {...state, current: id }
        case REMOVE_CURRENT_NODE:
            return { ...state, current: null }
        case ADD_NODE:
            return { ...state, nodes: [...state.nodes, node]}
        case REMOVE_NODE:
            return { ...state, nodes: [...state.nodes.slice(0, position), ...state.nodes.slice(position + 1)]}
        case REPLACE_NODES:
            return { ...state, nodes: applyNodeChanges(changes, state.nodes) }
        default:
            return state;
    }
}

export default nodesReducer;