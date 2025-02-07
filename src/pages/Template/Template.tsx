import { DndProvider } from "react-dnd";
import { Draft, OutputPanel, Panel } from "./container";
import { HTML5Backend } from "react-dnd-html5-backend";
import { ReactFlowProvider } from "reactflow";
import { Terminal } from "xterm";
import { FC, useEffect, useRef, useState } from "react";

const Template: FC = () => {
    const [showOPPanel, setShowOPPanel] = useState<boolean>(false);
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
        <span className="template__panelStatus">Show Panel</span>
        <OutputPanel isShown={showOPPanel} />
        {/* <div ref={terminalRef} style={{ height: '300px', width: '600px' }} /> */}
    </section>
}

export default Template;