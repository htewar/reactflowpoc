import { useDrop, XYCoord } from "react-dnd";
import { Background, BackgroundVariant, Controls, Edge, EdgeChange, MiniMap, Node, NodeChange, NodePositionChange, ReactFlow, useReactFlow } from "reactflow"
import { CustomNodeData, DraggableItem } from "../../../../types";
import { useCallback, useRef, useState } from "react";

const Draft = () => {
    const [nodes, setNodes] = useState<Node<CustomNodeData>[]>([]);
    const [edges, setEdges] = useState<Edge[]>([]);
    const reactFlowInstanceRef = useRef(false);
    const reactFlowWrapper = useRef<HTMLDivElement | null>(null);
    const { screenToFlowPosition } = useReactFlow()

    const [collectedProps, drop] = useDrop<DraggableItem>(() => ({
        accept: "block",
        drop: (item, monitor) => {
            const clientOffset = monitor.getClientOffset();
            addNode(item, clientOffset)
        }
    }))

    const onFlowInit = useCallback(() => {
        reactFlowInstanceRef.current = true;
    }, [])

    const addNode = (item: DraggableItem, position: XYCoord | null) => {
        if (!reactFlowInstanceRef.current) return;
        if (position?.x && position?.y) {
            setNodes(prevState => {
                const newNode = {
                    id: (prevState.length + 1).toString(),
                    position: screenToFlowPosition({ x: position.x, y: position.y }),
                    data: { label: `Node ${prevState.length + 1}` },
                }
                return [...prevState, newNode]
            })
        }
    }

    const onHandleNodesChange = useCallback((changes: NodeChange[]) => {
        setNodes((prevNodes) => {
            return prevNodes.map((node) => {
                const change = changes.find((c): c is NodePositionChange => 'id' in c && c.id === node.id);
                if (change) {
                    return { ...node, ...change };
                }
                return node;
            });
        });
    }, [setNodes])

    const onHandleEdgesChange = useCallback((changes: EdgeChange[]) => { }, [setEdges])

    return <ReactFlow nodes={nodes} edges={edges} onInit={onFlowInit} ref={node => {
        reactFlowWrapper.current = node;
        drop(node);
    }}>
        <Controls />
        <Background variant={BackgroundVariant.Lines} gap={10} color="#e9e9e9" id="1" />
        <Background variant={BackgroundVariant.Lines} gap={100} color="#cccccc" id="2" />
        <MiniMap />
    </ReactFlow>
}

export default Draft;