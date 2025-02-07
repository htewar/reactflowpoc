import { useDrop, XYCoord } from "react-dnd";
import { Background, BackgroundVariant, Connection, Controls, Edge, MarkerType, Node, NodeChange, NodeMouseHandler, ReactFlow, ReactFlowInstance } from "reactflow"
import { DraftProps, DraggableItem, NodeStatus, RootState } from "../../../../types";
import { v4 as uuid } from 'uuid';
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { DATA } from "../../data";
import { CustomEdge, CustomNode } from "../../../../components";
import { connect } from "react-redux";
import { addCurrentNode, AddEdge, AddNode, removeCurrentNode, ReplaceNodes } from "../../../../redux/actions/nodes.action";

const Draft: FC<DraftProps> = ({ dispatch, nodes, edges }) => {
    const [rfInstance, setRfInstance] = useState<ReactFlowInstance<Node, Edge> | null>(null);

    const edgeTypes = useMemo(() => ({customEdge: CustomEdge}), [dispatch, nodes])

    useEffect(() => {
        dispatch(removeCurrentNode())
    }, [])

    const [_, drop] = useDrop<DraggableItem>({
        accept: "block",
        drop: (item, monitor) => addNode(item, monitor.getClientOffset())
    })

    const onEdgeConnect = useCallback((connection: Connection) => {
        const edge = {
            ...connection,
            type: "customEdge",
            id: uuid(),
            markerEnd: {
                type: MarkerType.ArrowClosed,
                width: 15,
                height: 15,
                color: "#777777",
            },
        }
        dispatch(AddEdge(edge as Edge))
    }, [dispatch])

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
                        identifier: item.itemId,
                        label: `Node ${currentNodeNumber}`,
                        status: NodeStatus.IDLE,
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
    }, [dispatch]);

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
        onConnect={onEdgeConnect}
        onNodesChange={onHandleNodesChange}
        onNodeClick={onHandleNodeClick}
        onPaneClick={onHandleCanvasClick}
        nodeTypes={customNode}
        edgeTypes={edgeTypes}
        ref={drop}
        defaultViewport={{ x: 0, y: 0, zoom: 0.5 }}
        minZoom={0.5}
        maxZoom={2}
    >
        <Controls />
        <Background variant={BackgroundVariant.Lines} gap={10} color="#e9e9e9" id="1" />
        <Background variant={BackgroundVariant.Lines} gap={100} color="#cccccc" id="2" />
    </ReactFlow>
}

const mapStateToProps = ({ nodes }: RootState) => ({
    nodes: [...nodes.nodes],
    edges: [...nodes.edges]
})

export default connect(mapStateToProps)(Draft);