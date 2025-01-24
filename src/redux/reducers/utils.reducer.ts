import { UtilsAction, UtilsState } from "../../types";

const utilsReducerDefaultState: UtilsState = {
    loaderState: false,
    messages: []
};



const utilsReducer = (
    state: UtilsState = utilsReducerDefaultState,
    { type }: UtilsAction
) => {
    switch (type) {
        default:
            return state;
    }
};

export default utilsReducer;