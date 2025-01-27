import { CSSProperties, ReactNode } from "react"

export enum TitleVariant {
    Primary = "primary",
    Secondary = "secondary",
    Tertiary = "tertiary",
    PSBold18 = "psb-18",
    InterBold141 = "ib-14-1"
}

export enum ButtonVariant {
    Primary = "primary",
}

export enum ImageType {
    JPEG = "jpeg",
    PNG = "png",
    BINARY = "binary",
}

export enum TextVariant { }

export type TitleProps = {
    variant?: TitleVariant;
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

export type ButtonProps = {
    variant?: ButtonVariant;
    content: ReactNode;
    onButtonClick?: () => void;
    className?: string;
    icon?: string;
    [key: string]: any;
}

export type ImageProps = {
    name: string;
    className?: string;
    onIconClick?: () => void;
    type?: ImageType;
}

export type NodeProps = {
    id: string;
    nodeName: string;
    iconName: string;
}

