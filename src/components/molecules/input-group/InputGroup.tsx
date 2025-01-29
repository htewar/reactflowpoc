import { FC } from "react";
import { InputType, TitleVariant } from "../../../types";
import { InputGroupProps, InputGroupVariant, InputVariant } from "../../../types";
import { Dropdown, Input, Title } from "../../atoms";

const InputGroup: FC<InputGroupProps> = ({
    type = InputType.Input,
    title,
    variant = InputGroupVariant.Primary,
    contents = [],
    value = "",
    ...rest
}) => {
    return (
        <div className="form__inputGroup">
            <Title variant={TitleVariant.InterSemiBold121}>{title}</Title>
            {type == InputType.Input && <Input variant={InputVariant.Primary} value={value} onHandleText={() => { }} {...rest} />}
            {type == InputType.Dropdown && <Dropdown contents={contents} value={value} onHandleDropdownValue={() => {}} />}
        </div>
    );
};

export default InputGroup;