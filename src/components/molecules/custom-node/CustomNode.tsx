import { FC } from "react"
import { TextVariant, TitleVariant } from "../../../types";
import { Icon, Text, Title } from "../../atoms";
import { Handle, HandleType, NodeProps, Position } from "reactflow";
import { DATA } from "../../../pages/Template/data";

const CustomNode: FC<NodeProps> = ({ data }) => {
    const { identifier, icon, label } = data;
    const node = DATA.nodes.find(node => node.id == identifier)
    const handles = node?.handles;
    const iconProps = node?.iconProperties;
    const addedClass: string = `template__handle--${data.status}`;
    return <div className="customNode">
        {!!handles && !!handles.length && handles.map((handle, index) => <div key={index}>
            <Handle
                className={`template__handle ${addedClass.toLowerCase()}`}
                type={handle.type as HandleType}
                position={handle.position as Position}
            />
        </div>
        )}
        <div className="customNode__contents">
            <div className="customNode__header">
                {icon && <div><Icon name={icon} {...iconProps} /></div>}
                <Text variant={TextVariant.InterBold101}>{label}</Text>
            </div>
            <div className="customNode__body">
                <div className="customNode__body--details">
                    <Text variant={TextVariant.InterBold101}>Details</Text>
                    <Icon name="RightUpperArrow" />
                </div>
                <Text variant={TextVariant.InterMedium141}>Body section</Text>
                <div className="customNode__body--status">
                    <Text variant={TextVariant.InterBold101}>25% Done</Text>
                    <div className="customNode__statusDetails">
                        <Title variant={TitleVariant.InterBlack71}>In Progress</Title>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default CustomNode;