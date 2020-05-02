import * as React from "react";
import {useEffect, useState} from "react";
import {render} from "react-dom";
import Blox from "../blox";
import {Block, Category, Field, TypeDef} from "../types";
import '../../styles/_workspace.scss';
import Workspace from "./Workspace";

const Root = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [blocks, setBlocks] = useState<Block[]>([]);
    const [dir, setDir] = useState<TypeDef>([]);

    useEffect(() => {
        const workspace = new Blox();
        const t = (d: Field) => workspace.type(d);
        workspace.populate([
            {
                text: `say "${t({name: 'value', type: 'text', default: 'Hello, World!'})}"`,
                color: '#afbb2c',
                allowSpacing: true,
                category: {name: "Speech", label: "Speech", color: "#b52d2d"},
                order: 0,
                generate: 'print({{value}})',
                connections: "top and bottom"
            },
            {
                category: {name: "Dogs!", label: "Chickens", color: "#ababd6"},
                order: 0,
                text: `dogman ${t({name: 'number', type: 'number', default: '132'})}`,
                generate: "dog(man())",
                color: '#f7bae3',
                connections: "left"
            }
        ]);

        setCategories(workspace.categories);
        setBlocks(workspace.blocks);
        setDir(workspace.dir);
    }, []);

    return (
        <div>
            <Workspace
                categories={categories}
                blocks={blocks}
                dir={dir}
            />
        </div>
    )
};

render(<Root/>, document.getElementById('app-root'));