import { DndProvider } from "react-dnd";
import { Draft, Panel } from "./container";
import { HTML5Backend } from "react-dnd-html5-backend";

const Template: React.FC = () => {
    return <section className="section-template">
        <DndProvider backend={HTML5Backend}>
            <Panel />
            <Draft />
        </DndProvider>
    </section>
}

export default Template;