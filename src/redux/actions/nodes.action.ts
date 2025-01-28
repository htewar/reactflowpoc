import { AddCurrentNodeAction } from "../../types";

export const ADD_CURRENT_NODE = "ADD_CURRENT_NODE";
export const REMOVE_CURRENT_NODE = "REMOVE_CURRENT_NODE";

export const addCurrentNode = ({ id }: AddCurrentNodeAction) => ({
    id,
    type: ADD_CURRENT_NODE
})

export const removeCurrentNode = () => ({
    type: REMOVE_CURRENT_NODE
})