import { ChangeEvent, FC, useEffect, useState } from "react";
import { Button, Icon, Image, Title } from "../../atoms";
import { ButtonVariant, HeaderProps, InputGroupVariant, InputType, RootState, TitleVariant } from "../../../types";
import { InputGroup, Popup } from "../../molecules";
import { connect } from "react-redux";

const Header: FC<HeaderProps> = ({ nodes }) => {
    const [isPlayEnabled, setIsPlayEnabled] = useState<boolean>(false);
    const [startNode, setStartNode] = useState<string>("")

    useEffect(() => {
        setIsPlayEnabled(false);
        setStartNode("");
    }, [])

    const onHandleSetStartNode = (e: ChangeEvent<HTMLInputElement>) => setStartNode(e.target.value);

    const onHandleSave = () => { }

    const onHandleCancelExecute = () => {
        setStartNode("");
        onHandleExecute(false)
    }

    const onHandleExecute = (status?: boolean) => {
        if (typeof status == "boolean") setIsPlayEnabled(status)
        else setIsPlayEnabled(prevState => !prevState)
    }

    const onHandleNodeStart = () => { }

    return <div className="header">
        {isPlayEnabled && <Popup onClosePopup={() => { }} title="Execution Start Point" className="header__popupWrapper">
            <div className="header__popupBody">
                <InputGroup
                    title="Start Node"
                    type={InputType.Dropdown}
                    contents={nodes.map(node => node.data.label) || []}
                    variant={InputGroupVariant.Primary}
                    value={startNode}
                    onHandleInput={onHandleSetStartNode}
                    className="header__popupInput"
                    filter={false}
                />
                <div className="header__popupAction">
                    <Button content="Cancel" variant={ButtonVariant.DeleteSmall} onButtonClick={onHandleCancelExecute} />
                    <Button content="Execute" variant={ButtonVariant.PrimarySmall} onButtonClick={onHandleNodeStart} />
                </div>
            </div>
        </Popup>}
        <div>
            <div className="header__titleWrapper">
                <Icon name="Logo" />
                <Title variant={TitleVariant.PSBold18}>Scriptless Automation</Title>
            </div>
        </div>
        <div className="header__rightWrapper">
            <div className="u-cursor-pointer">
                <Icon onIconClick={onHandleExecute} name="Play" />
            </div>
            <div>
                <Button content="Save" onButtonClick={onHandleSave} />
            </div>
            <div className="header__userFrame">
                <Image className="header__user" name="anonymous_user" />
            </div>
        </div>
    </div>
}

const mapStateToProps = ({ nodes }: RootState) => ({
    nodes: nodes.nodes.filter(node => node.data.identifier == "1")
})

export default connect(mapStateToProps)(Header);