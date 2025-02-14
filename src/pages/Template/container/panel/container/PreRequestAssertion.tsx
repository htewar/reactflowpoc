import { FC, Fragment, useCallback, useMemo } from "react";
import { AssertionCard, Button, Dropdown, Input, InputGroup, SelectiveInput, Title } from "../../../../../components";
import { ButtonVariant, InputGroupVariant, InputType, InputVariant, TitleVariant, PreReqAssertionProps, CustomNodeData } from "../../../../../types";
import { Editor } from "@monaco-editor/react";
import { getPreAssertionNodes } from "../../../../../services";
import { Node } from "reactflow";
import { DropdownFnParams } from "../../../../../types/components";

const PreRequestAssertion: FC<PreReqAssertionProps> = ({
    nodes,
    edges,
    currentNode,
    reqParams,
    currentParams,
    isUpdate,
    updateIndex,
    error,
    onHandleParams,
    onAddPreReqParams,
    onHandlePreRequestEdit,
    onEditAssertion,
    onDeleteAssertion,
}) => {
    const isInsertReqParamAction = (): boolean => {
        const { currentKey, paramPosition, prevActionKey, prevParamPosition, prevNodeName } = currentParams;
        if (!!currentKey.length && !!paramPosition.length && !!prevActionKey.length && !!prevParamPosition.length && !!prevNodeName)
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


    return <Fragment>
        <div className="template__assertion">
            <Title variant={TitleVariant.InterBold141}>Pre-Request Assertion</Title>
            <div className="template__assertionCards">
                {reqParams.map((params, index) => {
                    return <AssertionCard
                        onAssertionClick={onHandlePreRequestEdit.bind(this, index)}
                        isSelected={updateIndex?.toString() == index.toString()}
                        key={index}
                        mapper={params.currentKey}
                        keyMapper={params.prevActionKey}
                        mappingValue={params.mapping.key}
                    />
                })}
            </div>
            <InputGroup
                title=""
                variant={InputGroupVariant.Primary} 
                value={currentParams.currentKey} 
                placeholder="Key" 
                onHandleInput={onHandleParams?.bind(this, "currentKey")}
                error={error?.currentKey}
            />
            {!!currentParams.currentKey.length &&
                <Fragment>
                    <InputGroup
                        title="Parameter Position"
                        variant={InputGroupVariant.Primary}
                        type={InputType.Dropdown}
                        contents={["Body", "Query", "Route"]}
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
                        contents={["Response", "Body", "Query"]}
                        filter={false}
                        value={currentParams.prevParamPosition}
                        onHandleDropdown={onHandleParams?.bind(this, "prevParamPosition")}
                    />
                    <InputGroup
                        title="Node Name"
                        variant={InputGroupVariant.Primary}
                        type={InputType.Dropdown}
                        contents={getNodes() || []}
                        value={currentParams.prevNodeName}
                        location="data.label"
                        placeholder="Select Node Name"
                        filter={getNodes().length > 1}
                        onHandleDropdown={onHandleParams?.bind(this, "prevNodeName")}
                    />
                </Fragment>
            }
            <SelectiveInput
                type={InputType.Dropdown}
                title="Data Mapping"
                disabled={!currentParams.isDataMapping}
                isActive={currentParams.isDataMapping}
                contents={["Type Conversion", "Code Conversion"]}
                key="value"
                value={currentParams.mapping.key}
                variant={InputGroupVariant.Primary}
                placeholder="Mapping Type"
                onToggleSwitch={() => onHandleParams("isDataMapping", { target: { value: !currentParams.isDataMapping } } as DropdownFnParams<boolean>)}
                onHandleDropdown={onHandleParams?.bind(this, "key")}
                filter={false}
            />
            <div className="u-margin-top-5">
                {currentParams.mapping.key.toString() == "Code Conversion" && currentParams.isDataMapping ?
                    <Editor height="100px" language="javascript" theme="light" /> :
                    <Dropdown
                        contents={["To String", "To Number", "To Boolean"]}
                        value={currentParams.mapping.value}
                        disabled={!currentParams.isDataMapping}
                        placeholder="Value"
                        onHandleDropdownValue={onHandleParams?.bind(this, "value")}
                        filter={false}
                    />
                }
            </div>
        </div>
        <div className="template__paramActions">
            {!isUpdate ? <Button
                className="u-margin-top-10 u-width-100"
                variant={ButtonVariant.Primary}
                content="Insert Pre Request Assertion"
                disabled={isInsertReqParamAction()}
                onButtonClick={onAddPreReqParams}
            /> :
                <Fragment>
                    <Button variant={ButtonVariant.Update} content="Update Assertion" onButtonClick={onEditAssertion} />
                    <Button variant={ButtonVariant.Delete} content="Delete Assertion" onButtonClick={onDeleteAssertion} />
                </Fragment>
            }
        </div>
    </Fragment>
}

export default PreRequestAssertion;