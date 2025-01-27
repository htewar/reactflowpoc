import { DndProvider } from "react-dnd";
import { Draft, Panel } from "./container";
import { HTML5Backend } from "react-dnd-html5-backend";
import { ReactFlowProvider } from "reactflow";

const Template: React.FC = () => {
    return <section className="section-template">
        <DndProvider backend={HTML5Backend}>
            <Panel />
            <div className="template__draft">
                <ReactFlowProvider>
                    <Draft />
                </ReactFlowProvider>
            </div>
        </DndProvider>
    </section>
}

export default Template;