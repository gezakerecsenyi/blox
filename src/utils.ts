import { AnyObject, Category } from './types';

export function areEqual(obj1: AnyObject, obj2: AnyObject): boolean {
    return Object.keys(obj1).length === Object.keys(obj2).length
        && Object.keys(1).every(value => obj1[value] === obj2[value]);
}

export function isCategory(value: any): value is Category {
    return !!value.name && !!value.label && !!value.color;
}

export function getTextDims(text: string, fontSize: number, fontFamily: string): [number, number] {
    const canvasElement = document.createElement('canvas');
    const context = canvasElement.getContext('2d');
    context.font = `${fontSize.toString()}px ${fontFamily}`;
    return [context.measureText(text).width, parseInt(context.font)];
}

export function roundNum(number: any, sf?: number | undefined, dp?: number | undefined) {
    let num = parseFloat(number.toString());
    if (sf) num = parseFloat(num.toPrecision(sf));
    if (dp) num = parseFloat(num.toFixed(dp));

    return num;
}

export function isString(value: any): value is string {
    return typeof value === 'string';
}

export function isNumber(value: any): value is number {
    return typeof value === 'number';
}

export function isInputSafe(value: any): value is string | number {
    return isString(value) || isNumber(value);
}
