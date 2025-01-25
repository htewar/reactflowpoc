import { FC } from "react";
import { Icon, Title } from "../../atoms";
import { TitleVariant } from "../../../types";

const Header: FC = () => {
    return <div className="header">
        <div className="header__titleWrapper">
            <Icon name="Logo" />
            <Title variant={TitleVariant.PSBold18}>Scriptless Automation</Title>
        </div>
    </div>
}

export default Header;