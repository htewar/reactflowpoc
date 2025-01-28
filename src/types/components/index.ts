import { ChangeEventHandler, CSSProperties, ReactNode } from "react"

export enum TitleVariant {
    Primary = "primary",
    Secondary = "secondary",
    Tertiary = "tertiary",
    PSBold18 = "psb-18",
    InterBold141 = "ib-14-1",
    InterSemiBold121 = "isb-12-1",
    InterSemiBold91 = "isb-9-1",
    InterSemiBold92 = "isb-9-2"
}

export enum ButtonVariant {
    Primary = "primary",
    Selection = "selection",
    Selected = "selected",
    Success = "success",
    Delete = "delete"
}

export enum ImageType {
    JPEG = "jpeg",
    PNG = "png",
    BINARY = "binary",
}

export enum TextVariant { 
    InterRegular141 = "ir-14-1",
    InterMedium141 = "im-14-1"
}

export enum InputVariant {
    Primary = "primary",
}

export enum InputGroupVariant {
    Primary = "primary",
}

export type TitleProps = {
    variant?: TitleVariant;
    children: ReactNode;
    style?: CSSProperties;
    className?: string;
}

export type TextProps = {
    variant: TextVariant;
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
} & React.ButtonHTMLAttributes<HTMLButtonElement>

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

export type SelectionProps = {
    selections: string[]
    currentSelection?: string,
    onHandleSelection?: (selection: string) => void;
}

export type InputProps = {
    onHandleText: ChangeEventHandler<HTMLInputElement>;
    variant: InputVariant;
    content?: ReactNode;
    placeholder?: string;
    className?: string;
    refCallback?: (ref: HTMLInputElement | null) => void;
} & React.InputHTMLAttributes<HTMLInputElement>

export type InputGroupProps = {
    title: string;
    variant: InputGroupVariant;
} & React.InputHTMLAttributes<HTMLInputElement>

export type SwitchProps = {
    isActive: boolean;
    onToggleSwitch?: () => void;
}

export type KVListProps = {
    isEnabled: boolean;
    title: string;
    lists: KeyValueProps[];
    onToggleEnablement?: () => void;
    onAddParameter?: (params: KeyValueProps, cb?: KVCallback) => void;
}

export type KVCallback = (isSuccess: boolean) => void;

export type KeyValueProps = {
    name: string;
    value: string;
}

export type ListProps = {
    isEnabled: boolean;
    list: KeyValueProps;
}