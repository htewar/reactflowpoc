import { ChangeEvent, useState } from "react";
import { Button, InputGroup, Title } from "../../../../../components";
import { AssertionParams, InputGroupVariant, InputType, ButtonVariant, TitleVariant } from "../../../../../types";

const Assertion = () => {
    const [assertions, setAssertions] = useState<AssertionParams[]>([]);
    const [assertion, setAssertion] = useState<AssertionParams>({
        property: "",
        comparison: undefined,
        objectPath: "",
    });

    const onAddAssertion = (key: string, e: ChangeEvent<HTMLInputElement>) => {
        setAssertion(prevState => ({
            ...prevState,
            [key]: e.target.value,
        }))
    }

    const hasAssertion = (): boolean => {
        return !!assertion.property.length && assertion.comparison != undefined && !!assertion.objectPath.length;
    }

    const onHandleAddAssertion = () => {
        setAssertions(prevState => [...prevState, assertion])
        setAssertion({
            property: "",
            comparison: undefined,
            objectPath: "",
        })
    }

    return <div className="template__assertions">
        <InputGroup
            title="Property"
            placeholder="e.g. id"
            variant={InputGroupVariant.Primary}
            value={assertion?.property}
            onHandleInput={onAddAssertion.bind(this, "property")}
        />
        <InputGroup
            title="Comparison Operator"
            type={InputType.Dropdown}
            placeholder=""
            variant={InputGroupVariant.Primary}
            contents={["EqualTo", "NotEqual", "GreaterThan", "GreaterThanOrEqual", "Less Than", "LessThanOrEqual"]}
            filter={false}
            value={assertion?.comparison ? String(assertion.comparison) : undefined}
            onHandleInput={(params: ChangeEvent<HTMLInputElement>) => onAddAssertion('comparison', params)}
        />
        <InputGroup
            title="Object path"
            placeholder="e.g. data.path1.path2.id"
            variant={InputGroupVariant.Primary}
            value={assertion?.objectPath}
            onHandleInput={onAddAssertion.bind(this, "objectPath")}
        />
        <div className="template__assertionAction">
            <Button
                variant={ButtonVariant.Primary}
                disabled={!hasAssertion()}
                content="Add Parameter"
                className="kvlists__button"
                onButtonClick={onHandleAddAssertion}
            />
        </div>
        <div className="template__assertionLists">
            {assertions.map((a, idx) => <div key={idx} className="template__assertionBox">
                <Title variant={TitleVariant.InterSemiBold141}>{a.property}</Title>
                <Title variant={TitleVariant.InterSemiBold141}>{String(a.comparison)}</Title>
                <Title variant={TitleVariant.InterSemiBold141}>{a.objectPath}</Title>
            </div>)}
        </div>
    </div>
}

export default Assertion;