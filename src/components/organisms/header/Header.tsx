import { FC } from "react";
import { Button, Icon, Image, Title } from "../../atoms";
import { TitleVariant } from "../../../types";

const Header: FC = () => {
    const onHandleSave = () => {}
    return <div className="header">
        <div>
            <div className="header__titleWrapper">
                <Icon name="Logo" />
                <Title variant={TitleVariant.PSBold18}>Scriptless Automation</Title>
            </div>
        </div>
        <div className="header__rightWrapper">
            <div>
                <Button content="Save" onButtonClick={onHandleSave} />
            </div>
            <div className="header__userFrame">
                <Image className="header__user" name="anonymous_user" />
            </div>
        </div>
    </div>
}

export default Header;