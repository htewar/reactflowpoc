import { ChangeEvent, FC, Fragment, useCallback } from "react";
import { AssertionCard, Button, InputGroup, Title } from "../../../../../components";
import { ButtonVariant, DropdownFnParams, InputGroupVariant, InputType, PostResponseAssertionProps, TitleVariant } from "../../../../../types";
import ResponseAssertion from "./ResponseAssertion";
import StatusAssertion from "./StatusAssertion";
import HeaderAssertion from "./HeaderAssertion";

interface AssertionProps {
    respParams: PostResponseAssertionProps[];
    assertion: PostResponseAssertionProps;
    isUpdate: boolean;
    updateIndex: number | null;
    onInsertAssertion: (param: PostResponseAssertionProps) => void;
    onHandleAssertion: (key: string, event: ChangeEvent<HTMLInputElement> | DropdownFnParams<string>) => void;
    onHandlePostRespAssertionEdit: (id: number) => void;
    onEditAssertion: () => void;
    onDeleteAssertion: () => void;
}

const PostResponseAssertion: FC<AssertionProps> = ({ onInsertAssertion, onHandleAssertion, onHandlePostRespAssertionEdit, onDeleteAssertion, onEditAssertion, respParams, assertion, isUpdate, updateIndex }) => {
    const isAddAssertionPermissible = useCallback((): boolean => {
        const isKey = !!assertion.key;
        const isValue = !!assertion.value;
        if (isKey && (assertion.condition == "Not Empty" || assertion.condition == "Not Nil"))
            return true;
        else if (isKey && (assertion.condition != "Not Empty" && assertion.condition != "Not Nil" && !!assertion.condition) && isValue)
            return true;
        return false;
    }, [assertion])

    return <Fragment>
        <div className="u-margin-top-10 template__assertion">
            <Title variant={TitleVariant.InterBold141}>Post Response Assertion</Title>
            <div className="template__assertionCards">
                {respParams.map((params, index) => <AssertionCard
                    key={index}
                    onAssertionClick={onHandlePostRespAssertionEdit.bind(this, index)}
                    isSelected={updateIndex?.toString() == index.toString()}
                    mapper={params.key}
                    mappingValue={params.value}
                    keyMapper={params.condition}
                />)}
            </div>
            <InputGroup
                title="Assertion type"
                type={InputType.Dropdown}
                variant={InputGroupVariant.Primary}
                contents={["Status Assertion", "Response Assertion", "Headers Assertion"]}
                filter={false}
                value={assertion.type}
                onHandleDropdown={onHandleAssertion.bind(this, "type")}
            />
            {/* Provides conditional assertion rendering */}
            {assertion.type == "Response Assertion" && <ResponseAssertion assertion={assertion} onHandleAssertion={onHandleAssertion} />}
            {assertion.type == "Status Assertion" && <StatusAssertion />}
            {assertion.type == "Headers Assertion" && <HeaderAssertion />}
        </div>
        <div className="template__paramActions">
            {!isUpdate ? <Button
                className="u-margin-top-10 u-width-100"
                variant={ButtonVariant.Primary}
                content="Insert Assertion"
                disabled={!isAddAssertionPermissible()}
                onButtonClick={onInsertAssertion.bind(this, assertion)}
            /> :
                <Fragment>
                    <Button variant={ButtonVariant.Update} content="Update Assertion" onButtonClick={onEditAssertion} />
                    <Button variant={ButtonVariant.Delete} content="Delete Assertion" onButtonClick={onDeleteAssertion} />
                </Fragment>}

        </div>
    </Fragment>
}

export default PostResponseAssertion;