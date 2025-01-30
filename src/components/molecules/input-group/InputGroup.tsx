import { ChangeEvent, FC } from "react";
import { InputType, TitleVariant } from "../../../types";
import { InputGroupProps, InputGroupVariant, InputVariant } from "../../../types";
import { Dropdown, Input, Title } from "../../atoms";

const InputGroup: FC<InputGroupProps> = ({
    type = InputType.Input,
    title,
    variant = InputGroupVariant.Primary,
    contents = [],
    value = "",
    filter = true,
    className,
    onHandleInput,
    ...rest
}) => {
    return (
        <div className={`form__inputGroup ${className? className+'--inputGroup': ''}`}>
            <Title variant={TitleVariant.InterSemiBold121}>{title}</Title>
            {type == InputType.Input && <Input variant={InputVariant.Primary} value={value} onHandleText={onHandleInput} {...rest} />}
            {type == InputType.Dropdown && 
                <Dropdown
                    contents={contents} 
                    value={value} 
                    onHandleDropdownValue={(params) => onHandleInput(params as ChangeEvent<HTMLInputElement>)} 
                    filter={filter}
                    className={className}
                    {...rest} 
                />}
        </div>
    );
};

export default InputGroup;