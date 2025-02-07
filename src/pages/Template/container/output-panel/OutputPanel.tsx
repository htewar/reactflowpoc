import { FC } from "react";
import OPHeader from "./container/OPHeader";

interface OutputPanelProps {
    isShown: boolean;
}

const OutputPanel: FC<OutputPanelProps> = ({ isShown }) => {
    return <div className={`template__outputPanel ${isShown ? "template__outputPanel--shown" : "template__outputPanel--hidden"}`}>
        <OPHeader />
    </div>
}

export default OutputPanel;