import { FC } from "react";
import { Icon } from "../../../../../components";

interface OPHeaderProps {
    onHandleHeaderClose: () => void;
}

const OPHeader: FC<OPHeaderProps> = ({ onHandleHeaderClose }) => {
    return <div className="template__opHeader">
        <div></div>
        <div className="template__opHeaderAction" onClick={onHandleHeaderClose}><Icon name="Close" /></div>
    </div>
}

export default OPHeader;