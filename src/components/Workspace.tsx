import * as React from 'react';
import {ReactElement} from 'react';
import Toolbox from "./Toolbox";
import {Block, Category, TypeDef} from "../types";

interface Props {
    categories: Category[]
    blocks: Block[]
    dir: TypeDef
}

export default function Workspace(props: Props): ReactElement {
    return (
        <div className="blox workspace">
            <Toolbox
                categories={props.categories}
                blocks={props.blocks}
                dir={props.dir}
            />
        </div>
    );
}