export type AnyObject = {
    [key: string]: AnyObject | any;
}

export interface Category {
    name: string;
    label: string;
    color: ColorString;
}

export interface Field {
    type: 'dummy' | 'string' | 'number' | 'check' | string;
    name: string;
    default?: string | number | boolean;
    options?: AnyObject;
}

export type ColorString = string;

export type TypeDef = AnyObject;

export interface Block {
    text: string;
    color: ColorString;
    allowSpacing?: boolean;
    category: Category;
    generate: string;
    order: number;
    connections: 'top' | 'bottom' | 'top and bottom' | 'left';
}
