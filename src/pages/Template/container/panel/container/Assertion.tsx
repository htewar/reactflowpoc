import { FC } from "react";
import { CustomNodeData, RootState } from "../../../../../types";
import PostResponseAssertion from "./PostResponseAssertion";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { Node } from "reactflow";

interface AssertionProps {
    dispatch: Dispatch,
    currentNode: string | null,
    nodes: Node<CustomNodeData>[],
}

const Assertion: FC<AssertionProps> = () => {
    return <div className="template__assertions">
        <PostResponseAssertion />
    </div>
}

const mapStateToProps = ({ nodes }: RootState) => ({ nodes: nodes.nodes })

export default connect(mapStateToProps)(Assertion);