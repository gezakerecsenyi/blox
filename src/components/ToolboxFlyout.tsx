import * as React from "react";
import {ReactElement} from "react";
import {Block, Category, TypeDef} from "../types";
import BlockComponent from "./blocks/BlockComponent";

interface Props {
    blocks: Block[],
    category: false | Category,
    dir: TypeDef
}

export default function ToolboxFlyout(props: Props): ReactElement {
    const blocks = props.blocks.filter(block => props.category && (block.category.name === props.category.name))
        .sort((a, b) => a.order - b.order);

    return props.category && (
        <div className="blox toolbox flyout">
            {blocks.map(block => (
                <BlockComponent
                    dir={props.dir}
                    block={block}
                    key={block.category.name + block.order.toString()}/>))}
        </div>
    )
}