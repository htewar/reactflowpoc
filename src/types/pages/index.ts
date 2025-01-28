import { Dispatch } from "redux"

export type DraftProps = {
    dispatch: Dispatch
}

export type PanelProps = {
    isNodeSelected: string | null;
    dispatch: Dispatch
}