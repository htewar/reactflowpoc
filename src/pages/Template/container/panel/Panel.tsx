import { FC } from "react";
import { Node } from "../../../../components";
import { DATA } from "../../data";

const Panel: FC = () => {
    const rows = [...Array(Math.ceil(DATA.nodes.length / 2))]
    const nodeRows = rows.map((_, index) => DATA.nodes.slice(index * 2, index * 2 + 2))
    
    const NodeLists = nodeRows.map((row, index) => (
        <div className="row" key={index}>
            {row.map((node, idx) => (
                <div className="col-1-of-2" key={`${index}-${idx}`}>
                    <Node iconName={node.icon} nodeName={node.node} />
                </div>
            ))}
        </div>
    ))
    return <div className="template__panel">
        {NodeLists}
    </div>
}

export default Panel;