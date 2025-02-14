import { FC } from "react";
import { TextVariant, TitleVariant } from "../../../types";
import { Text, Title } from "../../atoms";

interface AssertionCardProps {
    mapper: string;
    keyMapper: string;
    mappingValue?: string;
    onAssertionClick: () => void;
    isSelected: boolean;
}

const AssertionCard: FC<AssertionCardProps> = ({ mapper, keyMapper, mappingValue, onAssertionClick, isSelected }) => {
    console.log(isSelected)
    return <div className={`template__assertionCard ${isSelected ? "template__assertionCard--selected" : ""}`} onClick={onAssertionClick}>
        <Title className="template__assertionCardHeader" variant={TitleVariant.InterSemiBold122}>{mapper}:{keyMapper}</Title>
        <Text className="template__assertionCardBody" variant={TextVariant.InterRegular101}>{mappingValue ? mappingValue : "Not Provided"}</Text>
    </div>
}

export default AssertionCard;