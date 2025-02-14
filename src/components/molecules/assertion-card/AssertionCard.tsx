import { FC } from "react";
import { TextVariant, TitleVariant, PreRequestAssertionProps } from "../../../types";
import { Text, Title } from "../../atoms";

const AssertionCard: FC<PreRequestAssertionProps> = ({ currentKey, prevActionKey, mapping, onAssertionClick, isSelected }) => {
    console.log(isSelected)
    return <div className={`template__assertionCard ${isSelected ? "template__assertionCard--selected" : ""}`} onClick={onAssertionClick}>
        <Title className="template__assertionCardHeader" variant={TitleVariant.InterSemiBold122}>{currentKey}:{prevActionKey}</Title>
        <Text className="template__assertionCardBody" variant={TextVariant.InterRegular101}>{mapping.key ? mapping.key : "Not Provided"}</Text>
    </div>
}

export default AssertionCard;