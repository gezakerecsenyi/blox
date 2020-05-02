import {AnyObject, Category} from "./types";

export function areEqual(obj1: AnyObject, obj2: AnyObject): boolean {
    return Object.keys(obj1).length === Object.keys(obj2).length
        && Object.keys(1).every(value => obj1[value] === obj2[value])
}

export function isCategory(value: any): value is Category {
    return !!value.name && !!value.label && !!value.color;
}