import { ChangeEvent, FC, useEffect, useState } from "react";
import { Button, InputGroup, KVLists } from "../../../../../components";
import { 
    ButtonVariant, 
    InputGroupVariant, 
    InputType, 
    KeyValueProps, 
    KVCallback, 
    NodeMetadataProps, 
    NodeParams, 
    InputGroupLanguage, 
    DropdownFnParams 
} from "../../../../../types";
import { DATA } from "../data";

const NodeMetadata: FC<NodeMetadataProps> = ({ onDeleteNode, onSaveNode, selectedNode }) => {
    const [isQueryEnabled, setIsQueryEnabled] = useState<boolean>(false);
    const [isHeaderEnabled, setIsHeaderEnabled] = useState<boolean>(false);
    const [nodeData, setNodeData] = useState<NodeParams>({ ...DATA.NODE_DEFAULT_DATA });

    console.log("nodeData", nodeData)

    useEffect(() => {
        if (selectedNode) {
            const currentNodeData: NodeParams = JSON.parse(JSON.stringify(nodeData))
            currentNodeData.name = selectedNode.data.label || "";
            currentNodeData.metadata.url = selectedNode.data.metadata?.url || "";
            currentNodeData.metadata.headers = selectedNode.data.metadata?.headers || [];
            currentNodeData.metadata.params = selectedNode.data.metadata?.params || [];
            currentNodeData.metadata.method = selectedNode.data.metadata?.method || undefined;
            currentNodeData.metadata.body = selectedNode.data.metadata?.body || "";
            setNodeData(currentNodeData);
        }
    }, [selectedNode])

    const onToggleQuery = () => setIsQueryEnabled(prevState => !prevState);
    const onToggleHeader = () => setIsHeaderEnabled(prevState => !prevState);

    const onAddNodeName = (e: ChangeEvent<HTMLInputElement>) => {
        setNodeData(prevState => ({
            ...prevState,
            name: e.target.value,
        }))
    }

    const onAddMetadata = (key: string, e: ChangeEvent<HTMLInputElement>) => {
        setNodeData(prevState => ({
            ...prevState,
            metadata: {
                ...prevState.metadata,
                [key]: e.target.value,
            }
        }))
    }

    const onAddQueryParam = (param: KeyValueProps, cb?: KVCallback) => {
        setNodeData(prevState => ({
            ...prevState,
            metadata: {
                ...prevState.metadata,
                params: [...prevState.metadata.params, param]
            }
        }))
        if (cb) cb(true);
    }

    const onAddHeaderParam = (param: KeyValueProps, cb?: KVCallback) => {
        setNodeData(prevState => ({
            ...prevState,
            metadata: {
                ...prevState.metadata,
                headers: [...prevState.metadata.headers, param]
            }
        }))
        if (cb) cb(true);
    }

    const onDeleteQueryParam = (index: number) => {
        setNodeData(prevState => ({
            ...prevState,
            metadata: {
                ...prevState.metadata,
                params: [...prevState.metadata.params.slice(0, index), ...prevState.metadata.params.slice(index + 1)]
            }
        }))
    }

    const onDeleteHeaderParam = (index: number) => {
        setNodeData(prevState => ({
            ...prevState,
            metadata: {
                ...prevState.metadata,
                headers: [...prevState.metadata.headers.slice(0, index), ...prevState.metadata.headers.slice(index + 1)]
            }
        }))
    }

    const onHandleNodeSaveValidations = () => {
        onSaveNode(nodeData)
    }

    return <div className="template__nodemetadata">
        <div className="template__params">
            <InputGroup
                title="Node Name"
                placeholder=""
                variant={InputGroupVariant.Primary}
                value={nodeData.name}
                onHandleInput={onAddNodeName}
            />
            <InputGroup
                title="URL"
                placeholder="https://"
                variant={InputGroupVariant.Primary}
                value={nodeData.metadata.url}
                onHandleInput={(params: ChangeEvent<HTMLInputElement>) => onAddMetadata('url', params)}
            />
            <InputGroup
                title="HTTP Method"
                type={InputType.Dropdown}
                placeholder=""
                variant={InputGroupVariant.Primary}
                contents={['DELETE', 'GET', 'PATCH', 'POST', 'PUT']}
                filter={false}
                value={nodeData.metadata.method || ""}
                onHandleDropdown={(params: DropdownFnParams<string>) => onAddMetadata('method', params as ChangeEvent<HTMLInputElement>)}
            />
            {nodeData.metadata.method != "GET" && <InputGroup
                title="Body"
                type={InputType.Editor}
                variant={InputGroupVariant.Primary}
                language={InputGroupLanguage.JSON}
                value={nodeData.metadata.body}
                onHandleDropdown={(params: DropdownFnParams<string>) => onAddMetadata("body", params as ChangeEvent<HTMLInputElement>)}
            />}
            <InputGroup
                title="Authentication"
                type={InputType.Dropdown}
                placeholder="Select Authentication"
                variant={InputGroupVariant.Primary}
                contents={['Bearer Token', 'OAuth 2.0', 'API Key', 'SAML', 'Kerberos']}
                onHandleInput={(params: ChangeEvent<HTMLInputElement>) => onAddMetadata('authentication', params)}
                filter={false}
            />
            <KVLists
                title="Query Parameters"
                lists={nodeData.metadata.params}
                isEnabled={isQueryEnabled}
                onToggleEnablement={onToggleQuery}
                onAddParameter={onAddQueryParam}
                onDeleteParameter={onDeleteQueryParam}
            />
            <KVLists
                title="Header Parameters"
                lists={nodeData.metadata.headers}
                isEnabled={isHeaderEnabled}
                onToggleEnablement={onToggleHeader}
                onAddParameter={onAddHeaderParam}
                onDeleteParameter={onDeleteHeaderParam}
            />
        </div>
        <div className="template__paramActions">
            <Button variant={ButtonVariant.Success} content="Save Node" onButtonClick={onHandleNodeSaveValidations} />
            <Button variant={ButtonVariant.Delete} content="Delete Node" onButtonClick={onDeleteNode} />
        </div>
    </div>
}

export default NodeMetadata;