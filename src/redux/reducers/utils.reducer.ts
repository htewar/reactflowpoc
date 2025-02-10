import { UtilsAction, UtilsState } from "../../types";
import { CLEAR_DISPLAYED_MESSAGES, TERMINAL_DISPLAY_MESSAGE, TOGGLE_TERMINAL_DISPLAY } from "../actions/utils.action";

const utilsReducerDefaultState: UtilsState = {
    loaderState: false,
    isTerminalDisplayed: false,
    terminalDisplayMessages: [],
    messages: []
};



const utilsReducer = (
    state: UtilsState = utilsReducerDefaultState,
    { type, isInvert, message, count }: UtilsAction
) => {
    switch (type) {
        case TOGGLE_TERMINAL_DISPLAY:
            if (isInvert != undefined) {
                return { ...state, isTerminalDisplayed: isInvert }
            }
            return { ...state, isTerminalDisplayed: !state.isTerminalDisplayed }
        case TERMINAL_DISPLAY_MESSAGE:
            if (state.terminalDisplayMessages?.length > 0)
                return { ...state, terminalDisplayMessages: [...state.terminalDisplayMessages, message] }
            return { ...state, terminalDisplayMessages: [message] }
        case CLEAR_DISPLAYED_MESSAGES:
            return { ...state, terminalDisplayMessages: state.terminalDisplayMessages.slice(count) }
        default:
            return state;
    }
};

export default utilsReducer;