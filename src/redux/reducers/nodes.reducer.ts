import { NodesAction, NodeState } from "../../types"
import { ADD_CURRENT_NODE, REMOVE_CURRENT_NODE } from "../actions/nodes.action";

const nodesReducerDefaultState: NodeState = {
    current: null,
}

const nodesReducer = (state: NodeState = nodesReducerDefaultState, { type, id }: NodesAction) => {
    switch (type) {
        case ADD_CURRENT_NODE:
            return {...state, current: id }
        case REMOVE_CURRENT_NODE:
            return { ...state, current: null }
        default:
            return state;
    }
}

export default nodesReducer;