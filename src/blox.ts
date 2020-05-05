import { Block, Category, Field, TypeDef } from './types';
import { isCategory } from './utils';

export default class Blox {
    public dir: TypeDef = {};
    public categories: Category[] = [];
    blocks: Block[] = [];

    constructor(options?: any) {
        this.dir = {};
    }

    loop<T = any>(arr: T[], cb: (item: T, index: number, breakFunction: () => void) => void): void {
        const BreakException = {};

        for (let i = 0; i < arr.length; i++) {
            try {
                cb(arr[i], i, () => {
                    throw BreakException
                });
            } catch (e) {
                if (e !== BreakException) throw e;
                break;
            }
        }
    }

    // TODO: come up with something better here
    __shallowClone(obj: any) {
        return JSON.parse(JSON.stringify(obj));
    }

    type(obj: Field) {
        console.log(this);

        const tag = '{{' + this.__shallowClone(obj.name) + '}}';
        this.dir[tag] = this.__shallowClone(obj);

        return tag;
    }

    populate(blocks: Block[]) {
        const newBlocks = blocks;

        const categories: Category[] = [];
        blocks.forEach((block, d) => {
            let found = false;

            this.loop(categories, (category, i, brk) => {
                if (typeof block.category === "string") {
                    if (block.category === category.name) {
                        newBlocks[d].category = category;
                        found = true;
                        brk();
                    }
                } else {
                    if (block.category.name === category.name) {
                        newBlocks[d].category = category;
                        found = true;
                        brk();
                    }
                }
            });

            if (!found) {
                if (!isCategory(block.category)) {
                    this.loop(blocks, (comparisonBlock, s, bk) => {
                        if (isCategory(comparisonBlock.category)
                            && !isCategory(block.category)
                            && comparisonBlock.category.name === block.category) {
                            newBlocks[d].category = newBlocks[s].category;
                            found = true;
                            bk();
                        }
                    });

                    if (!found)
                        throw ReferenceError("Category '" + block.category + "' queried but never defined.")
                } else {
                    categories.push(block.category);
                }
            }
        });

        this.categories = categories;
        this.blocks = newBlocks;
    }
}

declare global {
    interface Window {
        Blox: any;
    }
}

window.Blox = Blox;
