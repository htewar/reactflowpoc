import { FC, useState } from "react";
import { Button, InputGroup, KVLists } from "../../../../components";
import { ButtonVariant, InputGroupVariant, InputType, KeyValueProps, KVCallback, NodeMetadataProps } from "../../../../types";

const NodeMetadata: FC<NodeMetadataProps> = ({ onDeleteNode }) => {
    const [isQueryEnabled, setIsQueryEnabled] = useState<boolean>(false);
    const [isHeaderEnabled, setIsHeaderEnabled] = useState<boolean>(false);
    const [queryLists, setQueryLists] = useState<KeyValueProps[]>([]);
    const [headerLists, setHeaderLists] = useState<KeyValueProps[]>([]);

    const onToggleQuery = () => setIsQueryEnabled(prevState => !prevState);
    const onToggleHeader = () => setIsHeaderEnabled(prevState => !prevState);

    const onAddQueryParam = (param: KeyValueProps, cb?: KVCallback) => {
        setQueryLists(prevState => [...prevState, param])
        if (cb) cb(true);
    }

    const onAddHeaderParam = (param: KeyValueProps, cb?: KVCallback) => {
        setHeaderLists(prevState => [...prevState, param]);
        if (cb) cb(true);
    }

    const onDeleteQueryParam = (index: number) => setQueryLists(prevState => [...prevState.slice(0, index), ...prevState.slice(index + 1)])

    const onDeleteHeaderParam = (index: number) => setHeaderLists(prevState => [...prevState.slice(0, index), ...prevState.slice(index + 1)])

    return <div className="template__nodemetadata">
        <div className="template__params">
            <InputGroup title="Node Name" placeholder="" variant={InputGroupVariant.Primary} />
            <InputGroup title="HTTP Method 2" type={InputType.Dropdown} variant={InputGroupVariant.Primary} contents={['a', 'b', 'c']} />
            <InputGroup title="HTTP Method" placeholder="" variant={InputGroupVariant.Primary} />
            <InputGroup title="URL" placeholder="https://" variant={InputGroupVariant.Primary} />
            <InputGroup title="Authentication" placeholder="Select Authentication" variant={InputGroupVariant.Primary} />
            <KVLists
                title="Query Parameters"
                lists={queryLists}
                isEnabled={isQueryEnabled}
                onToggleEnablement={onToggleQuery}
                onAddParameter={onAddQueryParam}
                onDeleteParameter={onDeleteQueryParam}
            />
            <KVLists
                title="Header Parameters"
                lists={headerLists}
                isEnabled={isHeaderEnabled}
                onToggleEnablement={onToggleHeader}
                onAddParameter={onAddHeaderParam}
                onDeleteParameter={onDeleteHeaderParam}
            />
        </div>
        <div className="template__paramActions">
            <Button variant={ButtonVariant.Success} content="Save Node" />
            <Button variant={ButtonVariant.Delete} content="Delete Node" onButtonClick={onDeleteNode} />
        </div>
    </div>
}

export default NodeMetadata;