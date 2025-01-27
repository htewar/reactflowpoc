import { Background, BackgroundVariant, Controls, MiniMap, ReactFlow, ReactFlowProvider } from "reactflow"

const Draft = () => {
    return <div className="template__draft">
        <ReactFlowProvider>
            <ReactFlow>
                <Controls />
                <Background variant={BackgroundVariant.Lines} gap={10} color="#e9e9e9" id="1" />
                <Background variant={BackgroundVariant.Lines} gap={100} color="#cccccc" id="2" />
                <MiniMap />
            </ReactFlow>
        </ReactFlowProvider>
    </div>
}

export default Draft;