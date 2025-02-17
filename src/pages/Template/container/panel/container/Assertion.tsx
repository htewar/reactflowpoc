import { ChangeEvent, FC, useEffect, useState } from "react";
import { AssertionParams, CustomNodeData, DropdownFnParams, HttpStatus, PostResponseAssertionProps, RootState } from "../../../../../types";
import PostResponseAssertion from "./PostResponseAssertion";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { Node } from "reactflow";
import { AddPostResponseParams, RemovePostResponseParams, UpdatePostResponseParams } from "../../../../../redux/actions/nodes.action";
import { DATA } from "../data";

interface AssertionProps {
    dispatch: Dispatch,
    currentNode: string | null,
    nodes: Node<CustomNodeData>[],
}

const Assertion: FC<AssertionProps> = ({ dispatch, nodes, currentNode }) => {
    const [assertions, setAssertions] = useState<AssertionParams>({
        preRequestAssertion: [],
        postResponseAssertion: [],
    });
    const [assertion, setAssertion] = useState<PostResponseAssertionProps>({ ...DATA.POST_RESPONSE_ASSERTION_DEFAULT_DATA })
    const [isUpdate, setIsUpdate] = useState<boolean>(false);
    const [isUpdateSelected, setIsUpdateSelected] = useState<number | null>();

    useEffect(() => {
        const currentAssertion = nodes.find(node => node.id == currentNode)?.data.assertion
        if (currentAssertion) setAssertions(prevState => ({
            ...prevState,
            postResponseAssertion: currentAssertion.postResponseAssertion,
        }))
    }, [nodes, currentNode])

    const onInsertAssertion = (params: PostResponseAssertionProps) => {
        if (currentNode) {
            dispatch(AddPostResponseParams(params, currentNode))
            setAssertion(({ ...DATA.POST_RESPONSE_ASSERTION_DEFAULT_DATA }))
        }
    }

    const onHandleAssertion = (key: string, event: ChangeEvent<HTMLInputElement> | DropdownFnParams<string | HttpStatus>) => {
        setAssertion(prevState => ({
            ...prevState,
            [key]: event.target.value,
            ...(key == "key" && event.target.value == "" ? { condition: "" } : {})
        }))
    }

    const onHandlePostRespAssertionEdit = (index: number) => {
        const selectedAssertion = assertions.postResponseAssertion[index]
        setAssertion(selectedAssertion)
        setIsUpdate(true);
        setIsUpdateSelected(index);
    }

    const onEditAssertion = () => {
        if (isUpdateSelected != null) {
            dispatch(UpdatePostResponseParams(assertion, isUpdateSelected))
            setIsUpdate(false);
            setIsUpdateSelected(null);
            setAssertion({ ...DATA.POST_RESPONSE_ASSERTION_DEFAULT_DATA })
        }
    }

    const onDeleteAssertion = () => {
        if (isUpdateSelected != null) {
            dispatch(RemovePostResponseParams(isUpdateSelected))
            setIsUpdate(false);
            setIsUpdateSelected(null)
            setAssertion({ ...DATA.POST_RESPONSE_ASSERTION_DEFAULT_DATA })
        }
    }

    return <div className="template__assertions">
        <PostResponseAssertion
            onInsertAssertion={onInsertAssertion}
            onHandleAssertion={onHandleAssertion}
            onHandlePostRespAssertionEdit={onHandlePostRespAssertionEdit}
            onDeleteAssertion={onDeleteAssertion}
            onEditAssertion={onEditAssertion}
            respParams={assertions.postResponseAssertion}
            assertion={assertion}
            isUpdate={isUpdate}
            updateIndex={typeof isUpdateSelected == "number" ? isUpdateSelected : null}
        />
    </div>
}

const mapStateToProps = ({ nodes }: RootState) => ({ nodes: nodes.nodes })

export default connect(mapStateToProps)(Assertion);