import { FC } from "react";
import { Button, InputGroup } from "../../../../components";
import { ButtonVariant, InputGroupVariant } from "../../../../types";

const NodeMetadata: FC = () => {
    return <div className="template__nodemetadata">
        <div className="template__params">
            <InputGroup title="Node Name" placeholder="" variant={InputGroupVariant.Primary} />
            <InputGroup title="URL" placeholder="https://" variant={InputGroupVariant.Primary} />
        </div>
        <div className="template__paramActions">
            <Button variant={ButtonVariant.Success} content="Save Node" />
            <Button variant={ButtonVariant.Delete} content="Delete Node" />
        </div>
    </div>
}

export default NodeMetadata;