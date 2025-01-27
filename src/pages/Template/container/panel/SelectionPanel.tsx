import { FC } from "react";
import { ButtonVariant, SelectionProps } from "../../../../types";
import { Button } from "../../../../components";

const SelectionPanel: FC<SelectionProps> = ({ selections, currentSelection, onHandleSelection }) => {
    return <div className="template__selectionWrapper">
        {selections.map((
            selection, index) => 
            <Button 
                variant={selection == currentSelection ? ButtonVariant.Selected : ButtonVariant.Selection} 
                key={index} 
                content={selection} 
                onButtonClick={onHandleSelection?.bind(this, selection)}
            />)}
    </div>
}

export default SelectionPanel;