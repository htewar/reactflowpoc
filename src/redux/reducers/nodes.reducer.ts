import { NodesAction, NodeState } from "../../types"

const nodesReducerDefaultState: NodeState = {}

const nodesReducer = (state: NodeState = nodesReducerDefaultState, { type }: NodesAction) => {
    switch (type) {
        default:
            return state;
    }
}

export default nodesReducer;