import { FC } from "react"
import { TextVariant } from "../../../types";
import { Icon, Text } from "../../atoms";
import { Handle, HandleType, NodeProps, Position } from "reactflow";
import { DATA } from "../../../pages/Template/data";

const CustomNode: FC<NodeProps> = ({ data }) => {
    const { identifier, icon, label } = data;
    const handles = DATA.nodes.find(node => node.id == identifier)?.handles;
    return <div className="customNode">
        {!!handles && !!handles.length && handles.map((handle, index) => <div>
            <Handle
                key={index}
                className="template__handle"
                type={handle.type as HandleType}
                position={handle.position as Position}
            />
        </div>
            )}
        <div className="customNode__contents">
            {icon && <div><Icon name={icon} /></div>}
            <Text variant={TextVariant.InterMedium141}>{label}</Text>
        </div>
    </div>
}

export default CustomNode;