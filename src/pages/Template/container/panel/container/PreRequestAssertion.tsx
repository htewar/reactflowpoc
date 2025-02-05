import { ChangeEvent, FC } from "react";
import { Button, Input, SelectiveInput, Title } from "../../../../../components";
import { ButtonVariant, InputGroupVariant, InputType, InputVariant, PreRequestAssertionProps, TitleVariant } from "../../../../../types";
import { Editor } from "@monaco-editor/react";
import { DropdownFnParams } from "../../../../../types/components";

type SwitchKeys = "isPrevActionKey" | "isDataMapping"

interface PreReqAssertionProps {
    reqParams: PreRequestAssertionProps[],
    currentParams: PreRequestAssertionProps,
    isPrevActive: boolean,
    isDataMapping: boolean,
    onToggleSwitch?: (key: SwitchKeys) => void,
    onHandleParams?: (key: string, event: ChangeEvent<HTMLInputElement> | DropdownFnParams<string>) => void;
}

const PreRequestAssertion: FC<PreReqAssertionProps> = ({ reqParams, currentParams, isPrevActive, isDataMapping, onToggleSwitch, onHandleParams }) => {
    let _ = reqParams;
    return <div className="template__assertion">
        <Title variant={TitleVariant.InterBold141}>Pre-Request Assertion</Title>
        <Input variant={InputVariant.Primary} value={currentParams.key} placeholder="Key" onHandleText={onHandleParams?.bind(this, "key")} />
        <SelectiveInput
            isActive={isPrevActive}
            disabled={!isPrevActive}
            title="Previous Action Key"
            variant={InputGroupVariant.Primary}
            placeholder="data.obj1.obj2.key"
            onToggleSwitch={onToggleSwitch?.bind(this, "isPrevActionKey" as SwitchKeys)}
            onHandleInput={onHandleParams?.bind(this, "prevActionKey")}
            value={currentParams.prevActionKey}
        />
        <SelectiveInput
            type={InputType.Dropdown}
            title="Data Mapping"
            disabled={!isDataMapping}
            isActive={isDataMapping}
            contents={["Type Conversion", "Code Conversion"]}
            key="value"
            value={currentParams.mapping.key}
            variant={InputGroupVariant.Primary}
            placeholder="Mapping Type"
            onToggleSwitch={onToggleSwitch?.bind(this, "isDataMapping" as SwitchKeys)}
            onHandleDropdown={onHandleParams?.bind(this, "key")}
            filter={false}
        />
        <div className="u-margin-top-5">
            {currentParams.mapping.key.toString() == "Code Conversion" && isDataMapping ? 
                <Editor height="100px" language="javascript" theme="light" options={{readOnly: true}} />: 
                <Input 
                    type={InputType.Dropdown} 
                    variant={InputVariant.Primary} 
                    disabled={!isDataMapping} 
                    placeholder="Value"
                />
            }
        </div>
        <Button
            className="u-margin-top-10 u-width-100"
            variant={ButtonVariant.Primary}
            content="Insert Pre Request Assertion"
            disabled={true}
        />
    </div>
}

export default PreRequestAssertion;