import { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Node } from "reactflow";

import { TextVariant, RootState, PanelProps, CustomNodeData, NodeParams } from "../../../../types";
import { Node as NodeComponent, Text } from "../../../../components";
import { DATA, SELECTIONS } from "../../data";
import SelectionPanel from "./container/SelectionPanel";
import NodeMetadata from "./container/NodeMetadata";
import Assertion from "./container/Assertion";
import { OnSaveNodeMetadata, removeCurrentNode, RemoveEdges, RemoveNode } from "../../../../redux/actions/nodes.action";
import Mapper from "./container/Mapper";

const Panel: FC<PanelProps> = ({ dispatch, isNodeSelected, nodes }) => {
    const rows = [...Array(Math.ceil(DATA.nodes.length / 2))]
    const nodeRows = rows.map((_, index) => DATA.nodes.slice(index * 2, index * 2 + 2))
    const [currentSelection, setCurrentSelection] = useState<string>(DATA.SELECTION_LISTS[0])
    const [selectedNode, setSelectedNode] = useState<Node<CustomNodeData> | null>(null);

    useEffect(() => {
        if (isNodeSelected) {
            setCurrentSelection(DATA.NODEPROP_LISTS[0])
            const selectedNodePosition = nodes.findIndex(node => node.id == isNodeSelected.toString());
            if (selectedNodePosition > -1) setSelectedNode(nodes[selectedNodePosition])
        }
        else setCurrentSelection(DATA.SELECTION_LISTS[0])
    }, [isNodeSelected])

    const onHandleSelect = (selectedSelection: string) => {
        setCurrentSelection(selectedSelection)
    }

    const onDeleteNode = () => {
        if (isNodeSelected) {
            dispatch(RemoveNode(+isNodeSelected))
            dispatch(removeCurrentNode())
            dispatch(RemoveEdges(+isNodeSelected))
        }
    }

    const onSaveNode = (params: NodeParams) => {
        if (selectedNode && isNodeSelected){
            const selectedNodeCopy:Node<CustomNodeData> = JSON.parse(JSON.stringify(selectedNode))
            selectedNodeCopy.data.label = params.name;
            selectedNodeCopy.data.metadata = params.metadata;
            dispatch(OnSaveNodeMetadata(+isNodeSelected, selectedNodeCopy.data))
            dispatch(removeCurrentNode())
        }
    }

    const NodeLists = nodeRows.map((row, index) => (
        <div className="row" key={index}>
            {row.map((node, idx) => (
                <div className="col-1-of-2" key={`${index}-${idx}`}>
                    <NodeComponent id={node.id} iconName={node.icon} nodeName={node.node} />
                </div>
            ))}
        </div>
    ))
    return <div className="template__panel">
        <SelectionPanel 
            selections={isNodeSelected ? DATA.NODEPROP_LISTS : DATA.SELECTION_LISTS} 
            currentSelection={currentSelection} 
            onHandleSelection={onHandleSelect} 
        />
        {currentSelection == SELECTIONS.COMPONENTS && NodeLists}
        {currentSelection == SELECTIONS.SETTINGS && <Text variant={TextVariant.InterRegular141}>To Be Updated</Text>}
        {currentSelection == SELECTIONS.PARAMETERS && <NodeMetadata selectedNode={selectedNode} onSaveNode={onSaveNode} onDeleteNode={onDeleteNode} />}
        {currentSelection == SELECTIONS.ASSERTIONS && <Assertion currentNode={isNodeSelected} />}
        {currentSelection == SELECTIONS.MODIFIERS && <Mapper currentNode={isNodeSelected} />}
    </div>
}

const mapStateToProps = ({ nodes }: RootState) => ({
    isNodeSelected: nodes.current,
    nodes: nodes.nodes,
})

export default connect(mapStateToProps)(Panel);