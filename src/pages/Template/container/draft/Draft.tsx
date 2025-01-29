import { useDrop, XYCoord } from "react-dnd";
import { Background, BackgroundVariant, Controls, Edge, MiniMap, Node, NodeChange, NodeMouseHandler, ReactFlow, ReactFlowInstance } from "reactflow"
import { DraftProps, DraggableItem, RootState } from "../../../../types";
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { DATA } from "../../data";
import { CustomNode } from "../../../../components";
import { connect } from "react-redux";
import { addCurrentNode, AddNode, removeCurrentNode, ReplaceNodes } from "../../../../redux/actions/nodes.action";

const Draft: FC<DraftProps> = ({ dispatch, nodes }) => {
    const [edges, setEdges] = useState<Edge[]>([]);
    const [rfInstance, setRfInstance] = useState<ReactFlowInstance<Node, Edge> | null>(null);

    useEffect(()=>{
        dispatch(removeCurrentNode())
    }, [])

    const [_, drop] = useDrop<DraggableItem>({
        accept: "block",
        drop: (item, monitor) => addNode(item, monitor.getClientOffset())
    })

    const addNode = (item: DraggableItem, position: XYCoord | null) => {
        if (!rfInstance) return;
        const droppedItemId = item.itemId;
        const droppedItem = DATA.nodes.slice().find(node => node.id == droppedItemId);
        if (!droppedItem) return;
        if (position?.x && position?.y) {
            const pos = rfInstance?.project({ x: position.x - 370 - 30, y: position.y - 80 - 25 })
            const currentNodeNumber = nodes.length + 1;
            if (pos?.x && pos?.y) {
                const newNode = {
                    id: currentNodeNumber.toString(),
                    position: { x: pos.x, y: pos.y },
                    type: "customNode",
                    data: {
                        label: `Node ${currentNodeNumber}`,
                        icon: droppedItem?.icon
                    },
                }
                dispatch(AddNode(newNode))
                dispatch(addCurrentNode({ id: currentNodeNumber.toString() }))
            }
        }
    }

    const handleInit = useCallback((instance: ReactFlowInstance) => {
        instance.setViewport({ x: 0, y: 0, zoom: 0.75 });
        setRfInstance(instance);
    }, []);

    const onHandleNodesChange = useCallback((changes: NodeChange[]) => {
        dispatch(ReplaceNodes(changes))
    }, []);

    const onHandleNodeClick: NodeMouseHandler = (e, node) => {
        e.stopPropagation();
        dispatch(addCurrentNode({ id: node.id }))
    }

    const onHandleCanvasClick = () => {
        dispatch(removeCurrentNode())
    }

    const customNode = useMemo(() => ({ customNode: CustomNode }), [])

    return <ReactFlow
        nodes={nodes}
        edges={edges}
        onInit={handleInit}
        onNodesChange={onHandleNodesChange}
        onNodeClick={onHandleNodeClick}
        onPaneClick={onHandleCanvasClick}
        nodeTypes={customNode}
        ref={drop}
        defaultViewport={{ x: 0, y: 0, zoom: 0.5 }}
        minZoom={0.5}
        maxZoom={2}
    >
        <Controls />
        <Background variant={BackgroundVariant.Lines} gap={10} color="#e9e9e9" id="1" />
        <Background variant={BackgroundVariant.Lines} gap={100} color="#cccccc" id="2" />
        <MiniMap />
    </ReactFlow>
}

const mapStateToProps = ({ nodes }: RootState) => ({
    nodes: nodes.nodes
})

export default connect(mapStateToProps)(Draft);