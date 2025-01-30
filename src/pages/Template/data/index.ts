import { Position } from "reactflow"

export const SELECTIONS = {
    COMPONENTS: "Components",
    SETTINGS: "Settings",
    PARAMETERS: "Parameters",
    ASSERTIONS: "Assertions",
}
export const DATA = {
    nodes: [
        {
            id: "1",
            icon: 'Action',
            node: 'Action',
            handles: [{type: "target", position: Position.Left}, {type: "source", position: Position.Right}]
        },
        {
            id: "2",
            icon: 'Slack',
            node: 'Slack',
            handles: [{type: "target", position: Position.Top}]
        },
        {
            id: "3",
            icon: 'Email',
            node: 'Email',
            handles: [{type: "target", position: Position.Top}]
        }
    ],
    SELECTION_LISTS: [SELECTIONS.COMPONENTS, SELECTIONS.SETTINGS],
    NODEPROP_LISTS: [SELECTIONS.PARAMETERS, SELECTIONS.ASSERTIONS],
}
