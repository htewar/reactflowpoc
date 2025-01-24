import { CSSProperties, ReactNode } from "react"

export enum TitleVariant {
    Primary = "primary",
    Secondary = "secondary",
    Tertiary = "tertiary"
}

export type TitleProps = {
    variant: TitleVariant;
    children: ReactNode;
    style?: CSSProperties;
    className?: string;
}