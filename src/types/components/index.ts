import { CSSProperties, ReactNode } from "react"

export enum TitleVariant {
    Primary = "primary",
    Secondary = "secondary",
    Tertiary = "tertiary"
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

