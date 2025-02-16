import { AssertionCondition, AssertionType, MappingKey, ParameterPlacementKey } from "../../../../../types";

export const DATA = {
    NODE_DEFAULT_DATA: {
        name: "",
        metadata: {
            method: undefined,
            url: "",
            params: [],
            headers: [],
            authentication: "",
            body: ""
        }
    },
    POST_RESPONSE_ASSERTION_DEFAULT_DATA: {
        type: "" as AssertionType,
        key: "",
        condition: "" as AssertionCondition,
        value: "",
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
    },
    PRE_REQUEST_ASSERTION_DEFAULT_ERROR: {
        currentKey: "",
        paramPosition: "",
        prevActionKey: "",
        prevParamPosition: "",
        prevNodeName: "",
        mapping: {
            key: "",
            value: "",
        }
    },
    PRE_REQUEST_ASSERTION_ERROR: {
        INVALID_URL: "Please enter a valid url containing the route parameter as key.",
        URL_NOT_FOUND: "URL not inserted. Please add a url before adding mapper assertions."
    }
}