import * as React from "react";
import {ReactElement} from "react";
import {AnyObject, Block, Field, TypeDef} from "../../types";
import '../../../styles/_block.scss'
import BlockField from "./BlockField";

interface Props {
    block: Block
    dir: TypeDef
}

/*
{
    text: `say "${t({name: 'value', type: 'text', default: 'Hello, World!'})}"`,
    color: '#afbb2c',
    allowSpacing: true,
    category: {name: "Speech", label: "Speech", color: "#b52d2d"},
    order: 0,
    generate: 'print({{value}})'
}
 */

export default function BlockComponent(props: Props): ReactElement {
    const parts: (Field)[] = props.block.text
        .split(/((?<![^\\]\\){{[^}]*(?:[^\\]|(?:\\\\))+?}})/g)
        .filter(e => e)
        .map(
            (e, i): any => i % 2 ? (e && props.dir[e]) : {name: "dummy" + i.toString(), type: "dummy", default: e}
        );
    console.log(parts, props.dir);

    return (
        <div
            className="blox block"
            style={{
                backgroundColor: props.block.color
            }}
        >
            {parts.map(field => (
                <BlockField key={field.name} field={field} />
            ))}
        </div>
    );
}