import { FC } from "react";
import { TitleVariant } from "../../../types";
import { InputGroupProps, InputVariant } from "../../../types/components";
import { Input, Title } from "../../atoms";

const InputGroup: FC<InputGroupProps> = ({
    title,
    variant = "2",
    ...rest
}) => {
    return (
        <div className="form__inputGroup">
            <Title
                variant={TitleVariant.InterBold141}
                className="form__calendarGroup--text u-margin-bottom-10"
            >
                {title}
            </Title>
            <Input variant={InputVariant.Primary} onHandleText={() =>{}} {...rest} />
        </div>
    );
};

export default InputGroup;