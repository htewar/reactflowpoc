import { ChangeEvent, ChangeEventHandler } from "react";
import { InputType, TitleVariant } from "../../../types";
import { InputGroupProps, InputGroupVariant, InputVariant } from "../../../types";
import { Dropdown, Input, Title } from "../../atoms";
import { DropdownFnParams } from "../../../types/components";

const InputGroup = <T,>({
    type = InputType.Input,
    title,
    variant = InputGroupVariant.Primary,
    contents = [],
    value,
    filter = true,
    className,
    location,
    onHandleInput,
    onHandleDropdown,
    ...rest
}: InputGroupProps<T>) => {
    console.log("key in inputGroup", location);
    return (
        <div className={`form__inputGroup ${className? className+'--inputGroup': ''}`}>
            <Title variant={TitleVariant.InterSemiBold121}>{title}</Title>
            {type == InputType.Input && 
                <Input 
                    variant={InputVariant.Primary} 
                    value={value} 
                    onHandleText={onHandleInput} 
                    {...rest} 
                />}
            {type == InputType.Dropdown && 
                <Dropdown
                    contents={contents} 
                    value={value} 
                    onHandleDropdownValue={onHandleDropdown}  
                    filter={filter}
                    className={className}
                    location={location}
                    {...rest} 
                />}
        </div>
    );
};

export default InputGroup;