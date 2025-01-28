import { FC } from "react";
import { TitleVariant } from "../../../types";
import { InputGroupProps, InputGroupVariant, InputVariant } from "../../../types";
import { Input, Title } from "../../atoms";

const InputGroup: FC<InputGroupProps> = ({
    title,
    variant = InputGroupVariant.Primary,
    ...rest
}) => {
    return (
        <div className="form__inputGroup">
            <Title variant={TitleVariant.InterSemiBold121}>{title}</Title>
            <Input variant={InputVariant.Primary} onHandleText={() => { }} {...rest} />
        </div>
    );
};

export default InputGroup;