import { FC, Fragment, useCallback, useMemo } from "react";
import { AssertionCard, Button, Dropdown, Input, InputGroup, SelectiveInput, Title } from "../../../../../components";
import { ButtonVariant, InputGroupVariant, InputType, InputVariant, TitleVariant, PreReqAssertionProps, SwitchKeys, CustomNodeData } from "../../../../../types";
import { Editor } from "@monaco-editor/react";
import { getPreAssertionNodes } from "../../../../../services";
import { Node } from "reactflow";

const PreRequestAssertion: FC<PreReqAssertionProps> = ({
    nodes,
    edges,
    currentNode,
    reqParams,
    currentParams,
    isDataMapping,
    isUpdate,
    updateIndex,
    onToggleSwitch,
    onHandleParams,
    onAddPreReqParams,
    onHandlePreRequestEdit,
    onEditAssertion,
}) => {
    const isInsertReqParamAction = (): boolean => {
        const { currentKey, paramPosition, prevActionKey, prevParamPosition } = currentParams;
        if (!!currentKey.length && !!paramPosition.length && !!prevActionKey.length && !!prevParamPosition.length)
            return false
        return true
    }

    const getPreActionNodes = useMemo(() => {
        if (currentNode)
            return getPreAssertionNodes(edges, currentNode)
        return [];
    }, [edges, currentNode])

    const getNodes = useCallback(() => {
        const preNodes = getPreActionNodes;
        const updatedNodes: Node<CustomNodeData>[] = [];
        for (const preNode of preNodes) {
            const node = nodes.find(n => n.id == preNode);
            if (node) updatedNodes.push(node);
        }
        return updatedNodes;
    }, [edges, nodes, currentNode])


    return <div className="template__assertion">
        <Title variant={TitleVariant.InterBold141}>Pre-Request Assertion</Title>
        <div className="template__assertionCards">
            {reqParams.map((params, index) => {
                return <AssertionCard
                    updateIndex={updateIndex}
                    onAssertionClick={onHandlePreRequestEdit.bind(this, index)}
                    isSelected={updateIndex?.toString() == index.toString()}
                    key={index}
                    {...params}
                />
            })}
        </div>
        <Input variant={InputVariant.Primary} value={currentParams.currentKey} placeholder="Key" onHandleText={onHandleParams?.bind(this, "currentKey")} />
        {!!currentParams.currentKey.length &&
            <Fragment>
                <InputGroup
                    title="Parameter Position"
                    variant={InputGroupVariant.Primary}
                    type={InputType.Dropdown}
                    contents={["Body", "Query"]}
                    onHandleDropdown={onHandleParams?.bind(this, "paramPosition")}
                    filter={false}
                    value={currentParams.paramPosition}
                />
            </Fragment>
        }
        <InputGroup title="Previous Action Key"
            variant={InputGroupVariant.Primary}
            placeholder="data.obj1.obj2.key"
            onHandleInput={onHandleParams?.bind(this, "prevActionKey")}
            value={currentParams.prevActionKey}
        />
        {!!currentParams.prevActionKey.length &&
            <Fragment>
                <InputGroup
                    title="Previous Action Parameter Position"
                    variant={InputGroupVariant.Primary}
                    type={InputType.Dropdown}
                    contents={["Body", "Query"]}
                    filter={false}
                    value={currentParams.prevParamPosition}
                    onHandleDropdown={onHandleParams?.bind(this, "prevParamPosition")}
                />
                <InputGroup
                    title="Node Name"
                    variant={InputGroupVariant.Primary}
                    type={InputType.Dropdown}
                    contents={getNodes()}
                    location="data.label"
                    placeholder="Select Node Name"
                />
            </Fragment>
        }
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
                <Editor height="100px" language="javascript" theme="light" /> :
                <Dropdown
                    contents={["To String", "To Number", "To Boolean"]}
                    value=""
                    disabled={!isDataMapping}
                    placeholder="Value"
                    filter={false}
                />
            }
        </div>
        {!isUpdate ? <Button
            className="u-margin-top-10 u-width-100"
            variant={ButtonVariant.Primary}
            content="Insert Pre Request Assertion"
            disabled={isInsertReqParamAction()}
            onButtonClick={onAddPreReqParams}
        /> : <div className="template__paramActions">
            <Button variant={ButtonVariant.Update} content="Update Assertion" onButtonClick={onEditAssertion} />
            <Button variant={ButtonVariant.Delete} content="Delete Assertion" />
        </div>}
    </div>
}

export default PreRequestAssertion;