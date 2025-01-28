import { FC } from "react"
import { TextVariant } from "../../../types";
import { Icon, Text } from "../../atoms";
import { Handle, NodeProps, Position } from "reactflow";

const CustomNode: FC<NodeProps> = ({ data }) => {
    const { icon, label } = data;
    return <div className="customNode">
        <Handle type="source" position={Position.Top} />
        <Handle type="source" position={Position.Right} />
        <Handle type="target" position={Position.Left} />
        <Handle type="target" position={Position.Bottom} />
        <div className="customNode__contents">
            {icon && <div><Icon name={icon} /></div>}
            <Text variant={TextVariant.InterMedium141}>{label}</Text>
        </div>
    </div>
}

export default CustomNode;