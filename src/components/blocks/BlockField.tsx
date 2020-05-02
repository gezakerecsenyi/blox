import * as React from "react";
import {ChangeEvent, ReactElement, useCallback, useReducer, useRef, useState} from "react";
import {Field} from "../../types";
import {Simulate} from "react-dom/test-utils";
import input = Simulate.input;

interface Props {
    field: Field
}

export default function BlockField(props: Props): ReactElement {
    switch (props.field.type) {
        case 'dummy':
            return (
                <div className="blox block field dummy">
                    {props.field.default}
                </div>
            );
        case "number":
        case "string":
            const [value, setValue] = useState(props.field.default || "");

            const change = useCallback((event: ChangeEvent<HTMLInputElement>) => {
                setValue(props.field.type === "string" ? event.target.value :
                    event.target.value.replace(/[^\d .]*/g, ""));
            }, []);

            const inputRef = useRef<HTMLInputElement | null>(null);

            const click = useCallback(() => {
                inputRef.current?.select();
            }, [inputRef]);

            const click = useCallback(() => {
                inputRef.current?.select();
            }, [inputRef]);

            return (
                <input
                    type="text"
                    className="blox block field number"
                    value={value}
                    onChange={change}
                    onFocus={click}
                    ref={inputRef}
                    style={{width: Math.min(50, Math.max(20, 1 + value.toString().length * 8))}}
                />
            );
        default:
            return null;
    }
}
