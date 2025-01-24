import { FC } from "react";
import { TitleProps } from "../../../types";

const Title: FC<TitleProps> = ({ variant, children, style, className }) => {
    return (
        <div
            className={`title title--${variant} ${className}`}
            style={{ ...style }}
        >
            {children}
        </div>
    );
};

export default Title;