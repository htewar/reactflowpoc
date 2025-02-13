import { Editor } from "@monaco-editor/react";
import { InputType, TitleVariant } from "../../../types";
import { InputGroupProps, InputGroupVariant, InputVariant } from "../../../types";
import { Dropdown, Input, Title } from "../../atoms";

const InputGroup = <T, >({
    type = InputType.Input,
    title,
    variant = InputGroupVariant.Primary,
    contents = [],
    value,
    filter = true,
    className,
    location,
    language,
    onHandleInput,
    onHandleDropdown,
    ...rest
}: InputGroupProps<T>) => {
    return (
        <div className={`form__inputGroup ${className ? className + '--inputGroup' : ''}`}>
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
            {type == InputType.Editor &&
                <div className="form__inputEditorWrapper">
                    <Editor
                        height="100px"
                        language={language}
                        theme="light"
                        value={typeof value == "string" ? value: ""}
                        onChange={(value) => {
                            if (value && onHandleDropdown) {
                                onHandleDropdown({target: {value: value as T}})
                            }
                        }}
                    />
                </div>
            }
        </div>
    );
};

export default InputGroup;