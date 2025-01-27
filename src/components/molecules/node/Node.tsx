import { FC } from "react";
import { Icon, Title } from "../../atoms";
import { NodeProps, TitleVariant } from "../../../types";

const Node: FC<NodeProps> = ({nodeName, iconName}) => {
    return <div className="node">
        <Icon name={iconName} />
        <Title variant={TitleVariant.InterBold141}>{nodeName}</Title>
    </div>
}

export default Node;