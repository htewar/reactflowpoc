import { Dispatch } from "redux";
import PreRequestAssertion from "./PreRequestAssertion";
import { AssertionParams, CustomNodeData, PreRequestAssertionProps, RootState, SwitchKeys } from "../../../../../types";
import { Edge, Node } from "reactflow";
import { ChangeEvent, FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import { DropdownFnParams } from "../../../../../types/components";
import { MappingKey } from "../../../../../types/pages";
import { AddPreRequestParams } from "../../../../../redux/actions/nodes.action";
import { DATA } from "../data";

interface MapperProps {
    dispatch: Dispatch,
    currentNode: string | null,
    nodes: Node<CustomNodeData>[],
    edges: Edge[],
}

const Mapper: FC<MapperProps> = ({ nodes, currentNode, dispatch, edges }) => {
    const [assertions, setAssertions] = useState<AssertionParams>({
        preRequestAssertion: []
    });

    const [isUpdate, setIsUpdate] = useState<boolean>(false);
    const [isUpdateSelected, setIsUpdateSelected] = useState<number | null>();

    useEffect(() => {
        setIsUpdate(false);
        setIsUpdateSelected(null);
    }, [])

    useEffect(() => {
        const currentAssertion = nodes.find(node => node.id == currentNode)?.data.assertion
        if (currentAssertion) setAssertions(prevState => ({
            ...prevState,
            preRequestAssertion: currentAssertion.preRequestAssertion,
        }))
    }, [nodes, currentNode])

    const [preRequestAssertion, setPreRequestAssertion] = useState<PreRequestAssertionProps>({...DATA.PRE_REQUEST_ASSERTION_DEFAULT_DATA})

    const [switches, setSwitches] = useState({
        isDataMapping: false,
    })

    const onHandlePreReqAssertionEdit = (index: number) => {
        const selectedAssertion = assertions.preRequestAssertion[index]
        setPreRequestAssertion(selectedAssertion)
        setIsUpdate(true);
        setIsUpdateSelected(index);
    }

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

    const AddRequestParams = () => {
        if (currentNode) dispatch(AddPreRequestParams(currentNode, preRequestAssertion))
    }

    const onEditAssertion = () => {
        const currentAssertion = assertions.preRequestAssertion;
        if (isUpdateSelected != null) {
            currentAssertion[isUpdateSelected] = preRequestAssertion;
            setAssertions(prevState => ({
                ...prevState,
                preRequestAssertion: currentAssertion
            }))
            setIsUpdate(false);
            setIsUpdateSelected(null);
            setPreRequestAssertion({...DATA.PRE_REQUEST_ASSERTION_DEFAULT_DATA})
        }
    }

    return <div className="template__assertions">
        <PreRequestAssertion
            nodes={nodes}
            edges={edges}
            currentNode={currentNode}
            reqParams={assertions.preRequestAssertion}
            isDataMapping={switches.isDataMapping}
            currentParams={preRequestAssertion}
            isUpdate={isUpdate}
            updateIndex={isUpdateSelected ? isUpdateSelected : null}
            onHandlePreRequestEdit={onHandlePreReqAssertionEdit}
            onToggleSwitch={onHandleSwitchState}
            onHandleParams={onHandlePreRequestParams}
            onAddPreReqParams={AddRequestParams}
            onEditAssertion={onEditAssertion}
        />
    </div>
}

const mapStateToProps = ({ nodes }: RootState) => ({ nodes: nodes.nodes, edges: nodes.edges })

export default connect(mapStateToProps)(Mapper);