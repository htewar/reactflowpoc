export const TOGGLE_TERMINAL_DISPLAY = "TOGGLE_TERMINAL_DISPLAY";
export const TERMINAL_DISPLAY_MESSAGE = "TERMINAL_DISPLAY_MESSAGE";
export const CLEAR_DISPLAYED_MESSAGES = "CLEAR_DISPLAYED_MESSAGES";

export const toggleTerminalDisplay = ({ isInvert }: ToggleTerminalDisplay = {}) => ({
    type: TOGGLE_TERMINAL_DISPLAY,
    isInvert
})

interface ToggleTerminalDisplay {
    isInvert?: boolean;
}

export const displayTerminalMessage = ({ message = "" }: { message: string }) => ({
    type: TERMINAL_DISPLAY_MESSAGE,
    message,
})

export const clearDisplayedTerminalMessages = ({ count = 0 }: { count: number }) => ({
    type: CLEAR_DISPLAYED_MESSAGES,
    count,
})