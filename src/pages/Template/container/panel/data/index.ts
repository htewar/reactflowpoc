import { MappingKey, ParameterPlacementKey } from "../../../../../types/pages";

export const DATA = {
    NODE_DEFAULT_DATA: {
        name: "",
        metadata: {
            method: undefined,
            url: "",
            params: [],
            headers: [],
            authentication: "",
        }
    },
    PRE_REQUEST_ASSERTION_DEFAULT_DATA: {
        currentKey: "",
        paramPosition: "" as ParameterPlacementKey,
        prevActionKey: "",
        prevParamPosition: "" as ParameterPlacementKey,
        prevNodeName: undefined,
        isDataMapping: false,
        mapping: {
            key: "" as MappingKey,
            value: "",
        }
    }
}