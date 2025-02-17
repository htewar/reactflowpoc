import { Edge, Position } from "reactflow"
import { isStartNode } from "../../../services"

export const SELECTIONS = {
    COMPONENTS: "Components",
    SETTINGS: "Settings",
    PARAMETERS: "Parameters",
    ASSERTIONS: "Assertions",
    MODIFIERS: "Mappers",
}
export const DATA = {
    nodes: [
        {
            id: "1",
            icon: 'Action',
            node: 'Action',
            handles: [{ type: "target", position: Position.Left }, { type: "source", position: Position.Right }]
        },
        {
            id: "2",
            icon: 'Slack',
            node: 'Slack',
            handles: [{ type: "target", position: Position.Top }]
        },
        {
            id: "3",
            icon: 'Email',
            node: 'Email',
            handles: [{ type: "target", position: Position.Top }]
        }
    ],
    SELECTION_LISTS: [
        {
            name: SELECTIONS.COMPONENTS,
            fn: null,
        },
        {
            name: SELECTIONS.SETTINGS,
            fn: null,
        }
    ],
    NODEPROP_LISTS: [
        {
            name: SELECTIONS.PARAMETERS,
            fn: null
        },
        {
            name: SELECTIONS.MODIFIERS,
            fn: ({ connections, id }: { connections: Edge[], id: string | null }) => !isStartNode(connections, id),
        },
        {
            name: SELECTIONS.ASSERTIONS,
            fn: null,
        }
    ],
    EXECUTION_IDS: ["1"],
}

