import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { Button, InputGroup, Title } from "../../../../../components";
import { ButtonVariant, DropdownFnParams, InputGroupVariant, InputType, PostResponseAssertionProps, TitleVariant } from "../../../../../types";
import { DATA } from "../data";

const PostResponseAssertion = () => {
    const [assertion, setAssertion] = useState<PostResponseAssertionProps>({...DATA.POST_RESPONSE_ASSERTION_DEFAULT_DATA})
    const onHandleAssertion = (key: string, event: ChangeEvent<HTMLInputElement> | DropdownFnParams<string>) => {
        setAssertion(prevState => ({
            ...prevState,
            [key]: event.target.value,
            ...(key == "key" && event.target.value == "" ? {condition: ""} : {})
        }))
    }

    const isAddAssertionPermissible = useCallback((): boolean => {
        const isKey = !!assertion.key;
        const isValue = !!assertion.value;
        if (isKey && (assertion.condition == "Not Empty" || assertion.condition == "Not Nil"))
            return true;
        else if (isKey && (assertion.condition != "Not Empty" && assertion.condition != "Not Nil" && !!assertion.condition) && isValue)
            return true;
        return false;
    }, [assertion])

    return <div className="u-margin-top-10 template__assertion">
        <Title variant={TitleVariant.InterBold141}>Post Response Assertion</Title>
        <InputGroup
            title=""
            variant={InputGroupVariant.Primary}
            value={assertion.key}
            placeholder="Key"
            onHandleInput={onHandleAssertion.bind(this, 'key')}
            error={""}
        />
        {assertion.key && <InputGroup
            title="Condition"
            variant={InputGroupVariant.Primary}
            type={InputType.Dropdown}
            contents={["Not Nil", "Not Empty", "Greater Than", "Greater Than OR Equal To", "Equal To", "Less Than", "Less Than OR Equal To"]}
            onHandleDropdown={onHandleAssertion.bind(this, 'condition')}
            filter={false}
            value={assertion.condition}
        />}
        {assertion.condition != "Not Empty" && assertion.condition != "Not Nil" && !!assertion.condition  && <InputGroup
            title="Value"
            variant={InputGroupVariant.Primary}
            value={assertion.value}
            placeholder="Comparison value"
            onHandleInput={onHandleAssertion.bind(this, 'value')}
            error={""}
        />}
        <Button
            className="u-margin-top-10 u-width-100"
            variant={ButtonVariant.Primary}
            content="Insert Assertion"
            disabled={!isAddAssertionPermissible()}
            onButtonClick={() => {}}
        />
    </div>
}

export default PostResponseAssertion;