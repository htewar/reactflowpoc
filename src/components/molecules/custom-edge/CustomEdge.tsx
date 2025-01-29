import { FC, Fragment } from "react";
import { BaseEdge, EdgeProps, getSmoothStepPath } from "reactflow";

const CustomEdge: FC<EdgeProps> = (edgeProps) => {
    const [d] = getSmoothStepPath({ ...edgeProps })
    return <Fragment>
        <BaseEdge style={{
            stroke: "#777777",
            strokeWidth: 4,
        }} 
        markerEnd={edgeProps.markerEnd}
        path={d} 
        />
    </Fragment>
}

export default CustomEdge;