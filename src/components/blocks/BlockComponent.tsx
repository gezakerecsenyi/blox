import * as React from 'react';
import { ReactElement } from 'react';
import { Block, Field, TypeDef } from '../../types';
import '../../../styles/_block.scss';
import BlockField from './BlockField';

interface Props {
    block: Block;
    dir: TypeDef;
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

export default function BlockComponent(
    {
        block,
        dir,
    }: Props,
): ReactElement {
    const parts: (Field)[] = block.text
        .split(/((?<![^\\]\\){{[^}]*(?:[^\\]|(?:\\\\))+?}})/g)
        .filter((e) => e)
        .map(
            (e, i): Field => ((/((?<![^\\]\\){{[^}]*(?:[^\\]|(?:\\\\))+?}})/g).test(e) ? (e && dir[e]) : {
                name: `dummy${i.toString()}`,
                type: 'dummy',
                default: e
            }),
        );
    console.log(parts, dir);

    return (
        <div
            className="blox block"
            style={{
                backgroundColor: block.color,
            }}
        >
            {parts.map((field) => (
                <BlockField key={field.name} field={field}/>
            ))}
        </div>
    );
}
