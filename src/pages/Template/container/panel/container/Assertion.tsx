import { ChangeEvent, useState } from "react";
import { AssertionParams, PreRequestAssertionProps } from "../../../../../types";
import PreRequestAssertion from "./PreRequestAssertion";
import { DropdownFnParams } from "../../../../../types/components";
import { MappingKey } from "../../../../../types/pages";

type SwitchKeys = "isPrevActionKey" | "isDataMapping"

const Assertion = () => {
    const [assertions, setAssertions] = useState<AssertionParams>({
        preRequestAssertion: []
    });

    const [preRequestAssertion, setPreRequestAssertion] = useState<PreRequestAssertionProps>({
        key: "",
        prevActionKey: "",
        mapping: {
            key: "",
            value: "",
        }
    })

    const [switches, setSwitches] = useState({
        isPrevActionKey: false,
        isDataMapping: false,
    })

    const onHandleSwitchState = (key: SwitchKeys) => {
        setSwitches(prevState => ({
            ...prevState,
            [key]: !prevState[key]
        }))
    }

    const onHandlePreRequestParams = (key: string, event: ChangeEvent<HTMLInputElement> | DropdownFnParams<string>) => {
        setPreRequestAssertion(prevState => ({
            ...prevState,  
            ...(key == "key"
                ? { 
                    mapping: { 
                        ...prevState.mapping, 
                        "key": event.target.value as MappingKey
                    } 
                } 
                : { [key]: event.target.value }
            )
        }))
    }

    const onHandlePreRequestMapping = (key: string, value: DropdownFnParams<string>) => {}


    return <div className="template__assertions">
        <PreRequestAssertion
            reqParams={[]}
            isPrevActive={switches.isPrevActionKey}
            isDataMapping={switches.isDataMapping}
            currentParams={preRequestAssertion}
            onToggleSwitch={onHandleSwitchState}
            onHandleParams={onHandlePreRequestParams}
        />
    </div>
}

export default Assertion;