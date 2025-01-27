import { FC } from "react"
import { TextVariant } from "../../../types";
import { Icon, Text } from "../../atoms";
import { NodeProps } from "reactflow";

const CustomNode:FC<NodeProps> = ({ data }) => {
    const { icon, label } = data;
    return <div>
        {icon && <div><Icon name={icon} /></div>}
        <Text variant={TextVariant.InterRegular141}>{label}</Text>
    </div>
}

export default CustomNode;