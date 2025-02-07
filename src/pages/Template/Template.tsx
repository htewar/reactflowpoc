import { DndProvider } from "react-dnd";
import { Draft, OutputPanel, Panel } from "./container";
import { HTML5Backend } from "react-dnd-html5-backend";
import { ReactFlowProvider } from "reactflow";
import { Terminal } from "xterm";
import { FC, useEffect, useRef, useState } from "react";
import { Icon } from "../../components";

const Template: FC = () => {
    const [showOPPanel, setShowOPPanel] = useState<boolean>(false);
    const onToggleShowPanel = () => setShowOPPanel(prevState => !prevState)
    // const terminalRef = useRef<HTMLDivElement>(null);
    // useEffect(() => {
    //     const terminal = new Terminal();
    //     terminal.open(terminalRef.current!);
    //     terminal.writeln('Hello from xterm.js!');
    //     terminal.onData((data) => {
    //         terminal.write(data); // Simple echo
    //     });
    // }, []);

    return <section className="section-template">
        <DndProvider backend={HTML5Backend}>
            <Panel />
            <div className="template__draft">
                <ReactFlowProvider>
                    <Draft />
                </ReactFlowProvider>
            </div>
        </DndProvider>
        <span className="template__panelStatus" onClick={onToggleShowPanel}><Icon name="Code" /></span>
        <OutputPanel isShown={showOPPanel} onHandleHeaderClose={onToggleShowPanel} />
        {/* <div ref={terminalRef} style={{ height: '300px', width: '600px' }} /> */}
    </section>
}

export default Template;