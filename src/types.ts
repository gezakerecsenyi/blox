export type AnyObject = {
    [key: string]: AnyObject | any;
}

export interface Category {
    name: string;
    label: string;
    color: ColorString;
}

export interface Field {
    type: 'dummy' | 'string' | 'number' | 'check' | 'select' | string;
    name: string;
    default?: string | number | boolean;
    options?: AnyObject;
    value?: any;
    updater?: (newValue: any) => void;
}

export type ColorString = string;

export type TypeDef = {
    [key: string]: Field
};

export type ConnectionType = 'top' | 'bottom' | 'top and bottom' | 'left'

export interface Block {
    text: string;
    color?: ColorString;
    allowSpacing?: boolean;
    category: Category;
    generate: string;
    order: number;
    connections: ConnectionType;
}
