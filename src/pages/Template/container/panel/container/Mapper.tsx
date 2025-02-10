import { Dispatch } from "redux";
import PreRequestAssertion from "./PreRequestAssertion";
import { AssertionParams, CustomNodeData, PreRequestAssertionProps, RootState, SwitchKeys } from "../../../../../types";
import { Node } from "reactflow";
import { ChangeEvent, FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import { DropdownFnParams } from "../../../../../types/components";
import { MappingKey } from "../../../../../types/pages";
import { AddPreRequestParams } from "../../../../../redux/actions/nodes.action";

interface MapperProps {
    dispatch: Dispatch,
    currentNode: string | null,
    nodes: Node<CustomNodeData>[],
}

const Mapper:FC<MapperProps> = ({ nodes, currentNode, dispatch }) => {
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
    
        const [preRequestAssertion, setPreRequestAssertion] = useState<PreRequestAssertionProps>({
            currentKey: "",
            paramPosition: "",
            prevActionKey: "",
            prevParamPosition: "",
            mapping: {
                key: "",
                value: "",
            }
        })
    
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
    return <div className="template__assertions">
        <PreRequestAssertion
            reqParams={assertions.preRequestAssertion}
            isDataMapping={switches.isDataMapping}
            currentParams={preRequestAssertion}
            isUpdate={isUpdate}
            updateIndex={isUpdateSelected ? isUpdateSelected : null}
            onHandlePreRequestEdit={onHandlePreReqAssertionEdit}
            onToggleSwitch={onHandleSwitchState}
            onHandleParams={onHandlePreRequestParams}
            onAddPreReqParams={AddRequestParams}
        />
    </div>
}

const mapStateToProps = ({ nodes }: RootState) => ({ nodes: nodes.nodes })

export default connect(mapStateToProps)(Mapper);