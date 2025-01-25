import { CSSProperties, ReactNode } from "react"

export enum TitleVariant {
    Primary = "primary",
    Secondary = "secondary",
    Tertiary = "tertiary",
    PSBold18 = "psb-18"
}

export enum TextVariant {}

export type TitleProps = {
    variant: TitleVariant;
    children: ReactNode;
    style?: CSSProperties;
    className?: string;
}

export type TextProps = {
    variant: TitleVariant;
    children: ReactNode;
    style?: CSSProperties;
    className?: string;
}

export type IconProps = {
    name: String;
    onIconClick?: () => void;
    [key: string]: any;
}

