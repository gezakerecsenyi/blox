import * as React from "react";
import {ReactElement, useState} from "react";
import {Block, Category, TypeDef} from "../types";
import CategorySection from "./CategorySection";
import '../../styles/_toolbox.scss'
import ToolboxFlyout from "./ToolboxFlyout";

interface Props {
    categories: Category[];
    blocks: Block[];
    dir: TypeDef
}

export default function Toolbox(props: Props): ReactElement {
    const [whichIsFocused, setFocusedCategory] = useState<Category | false>(false);

    return (
        <div className="blox sidebar">
            <div className="blox toolbox">
                {props.categories.map((category, index) => (
                        <CategorySection
                            index={index}
                            category={category}
                            key={category.name}
                            style={{
                                backgroundColor: (whichIsFocused && whichIsFocused.name === category.name) ? category.color : 'transparent'
                            }}
                            clickHandler={setFocusedCategory}
                        />
                    )
                )}
            </div>
            <ToolboxFlyout
                category={whichIsFocused}
                blocks={props.blocks}
                dir={props.dir}
            />
        </div>
    );
}