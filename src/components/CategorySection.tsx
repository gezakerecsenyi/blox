import * as React from "react";
import {Dispatch, ReactElement, SetStateAction, useMemo} from "react";
import {AnyObject, Category} from "../types";

interface Props {
    index: number;
    category: Category;
    style: AnyObject;
    clickHandler: Dispatch<SetStateAction<Category | false>>
}

export default function CategorySection(props: Props): ReactElement {
    const top = useMemo(() => {
        return 10 + 15 * props.index + 40 * props.index;
    }, [props.index]);

    return (
        <div
            className={"blox category"}
            style={{
                top,
                ...props.style
            }}
            onClick={() => props.clickHandler(props.category)}
        >
            <div className={"blox color"}
                 style={{
                     backgroundColor: props.category.color
                 }}
            />
            <p className="blox label">
                {props.category.label}
            </p>
        </div>
    )
}