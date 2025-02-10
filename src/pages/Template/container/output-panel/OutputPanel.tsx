import { FC } from "react";
import OPHeader from "./container/OPHeader";
import OPTerminal from "./container/OPTerminal";

interface OutputPanelProps {
    isShown: boolean;
    onHandleHeaderClose: () => void;
}

const OutputPanel: FC<OutputPanelProps> = ({ isShown, onHandleHeaderClose }) => {
    return <div className={`template__outputPanel ${isShown ? "template__outputPanel--shown" : "template__outputPanel--hidden"}`}>
        <OPHeader onHandleHeaderClose={onHandleHeaderClose} />
        <OPTerminal />
    </div>
}

export default OutputPanel;