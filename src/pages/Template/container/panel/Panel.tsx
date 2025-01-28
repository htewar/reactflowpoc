import { FC, useEffect, useState } from "react";
import { Node, Text } from "../../../../components";
import { DATA, SELECTIONS } from "../../data";
import SelectionPanel from "./SelectionPanel";
import { TextVariant, RootState, PanelProps } from "../../../../types";
import { connect } from "react-redux";
import NodeMetadata from "./NodeMetadata";

const Panel: FC<PanelProps> = ({ isNodeSelected }) => {
    const rows = [...Array(Math.ceil(DATA.nodes.length / 2))]
    const nodeRows = rows.map((_, index) => DATA.nodes.slice(index * 2, index * 2 + 2))
    const [currentSelection, setCurrentSelection] = useState<string>(DATA.SELECTION_LISTS[0])

    useEffect(() => {
        if (isNodeSelected) setCurrentSelection(DATA.NODEPROP_LISTS[0])
        else setCurrentSelection(DATA.SELECTION_LISTS[0])
    }, [isNodeSelected])

    const onHandleSelect = (selectedSelection: string) => {
        setCurrentSelection(selectedSelection)
    }

    const NodeLists = nodeRows.map((row, index) => (
        <div className="row" key={index}>
            {row.map((node, idx) => (
                <div className="col-1-of-2" key={`${index}-${idx}`}>
                    <Node id={node.id} iconName={node.icon} nodeName={node.node} />
                </div>
            ))}
        </div>
    ))
    return <div className="template__panel">
        <SelectionPanel selections={isNodeSelected ? DATA.NODEPROP_LISTS : DATA.SELECTION_LISTS} currentSelection={currentSelection} onHandleSelection={onHandleSelect} />
        {currentSelection == SELECTIONS.COMPONENTS && NodeLists}
        {currentSelection == SELECTIONS.SETTINGS && <Text variant={TextVariant.InterRegular141}>To Be Updated</Text>}
        {currentSelection == SELECTIONS.PARAMETERS && <NodeMetadata />}
    </div>
}

const mapStateToProps = ({ nodes }: RootState) => ({
    isNodeSelected: nodes.current,
})

export default connect(mapStateToProps)(Panel);