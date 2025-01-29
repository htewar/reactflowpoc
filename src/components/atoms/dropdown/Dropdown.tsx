import { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import { ButtonVariant, DropdownProps, InputVariant, TextVariant } from "../../../types";
import { Text } from "../text";
import { Button } from "../button";
import { Input } from "../input";
import useOutsideClick from "./UseOutsideClick";

const Dropdown: FC<DropdownProps> = ({
    contents,
    value,
    placeholder = "Select",
    onHandleDropdownValue,
    className,
    filter = true,
}) => {

    useEffect(() => {
        setUpdatedContents(contents);
    }, [contents]);

    const [val, setVal] = useState<string>();
    const [active, setActive] = useState<boolean>(false);
    const [updatedContents, setUpdatedContents] = useState<string[]>(contents);

    useEffect(() => {
        if (value) setVal(value);
        else setVal("");
    }, [value]);

    const menuRef = useRef<HTMLDivElement>(null);
    useOutsideClick(menuRef, () => setActive(false));


    const onHandleListToggle = () => setActive((prevState) => !prevState);

    const onHandleValueSelect = (val: string) => {
        setActive(false);
        setVal(val);
        onHandleDropdownValue({ target: { value: val } });
    };

    const onSetContentFilter = (e: ChangeEvent<HTMLInputElement>) => {
        const text = e.target.value;
        let newContents = contents;
        newContents = newContents.filter((newContent) =>
            newContent.toLowerCase().includes(text.toLowerCase())
        );
        setUpdatedContents(newContents);
    };
    return (
        <div className={`form__dropdown-1 ${className}`} ref={menuRef}>
            <div className="form__dropdown-1--value" onClick={onHandleListToggle}>
                <span>
                    <Text variant={TextVariant.InterRegular141}>{val || placeholder}</Text>
                </span>
                <span>
                    <Button variant={ButtonVariant.Primary} icon="ArrowDown" content="" />
                </span>
            </div>
            {active && (
                <div className="form__dropdown-1--list">
                    {filter && (
                        <Input
                            variant={InputVariant.Primary}
                            onHandleText={onSetContentFilter}
                            placeholder="Filter"
                            className="form__dropdown-1--input"
                            autoFocus
                        />
                    )}
                    <ul>
                        {contents &&
                            updatedContents.map((content, index) => (
                                <li
                                    onClick={onHandleValueSelect.bind(this, content)}
                                    key={index}
                                >
                                    <Text variant={TextVariant.InterRegular141}>{content}</Text>
                                </li>
                            ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Dropdown;