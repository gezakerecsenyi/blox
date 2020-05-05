import * as React from 'react';
import { ChangeEvent, ReactElement, useCallback, useRef, useState } from 'react';
import { Simulate } from 'react-dom/test-utils';
import { Field } from '../../types';
import { getTextDims, isInputSafe, roundNum } from '../../utils';
import input = Simulate.input;

interface Props {
    field: Field;
}

export default function BlockField(
    {
        field
    }: Props): ReactElement {
    switch (field.type) {
        case 'dummy':
            return (
                <div className="blox block field dummy">
                    {field.default}
                </div>
            );
        case 'number':
        case 'string':
            const [value, setValue] = useState(field.default || '');

            const change = useCallback((event: ChangeEvent<HTMLInputElement>) => {
                const newVal = field.type === 'string' ? event.target.value.slice(0, field.options?.maxLength)
                    : event.target.value.replace(/[^\d .]*/g, '');

                setValue(newVal);
                field.updater(newVal);
            }, []);

            const inputRef = useRef<HTMLInputElement | null>(null);

            const click = useCallback(() => {
                inputRef.current?.select();
            }, [inputRef]);

            const defocus = useCallback((event) => {
                setValue((field.type === 'string' ? event.target.value.trim()
                    : roundNum(event.target.value.replace(/[^\d.]*/g, ''), field.options?.toSF, field.options?.toDP)
                    || field.default || (field.type === 'string' ? '' : '0')));
            }, [inputRef]);

            return (
                <input
                    type="text"
                    className={`blox block field ${field.type}`}
                    value={isInputSafe(value) ? value : ''}
                    onChange={change}
                    onFocus={click}
                    onBlur={defocus}
                    ref={inputRef}
                    style={{width: Math.min(field.type === 'number' ? 50 : 150, Math.max(20, getTextDims(value.toString().trim(), 16, 'Roboto')[0]))}}
                />
            );
        case 'check':
            const changeHandler = useCallback((event) => {
                field.updater(event.target.checked);
            }, []);

            return (
                <label className='blox block field check label'>
                    {
                        field.default ? (
                            <input
                                type="checkbox"
                                className='blox block field check'
                                onChange={changeHandler}
                                defaultChecked={true}
                            />
                        ) : (
                            <input
                                type="checkbox"
                                className='blox block field check'
                                onChange={changeHandler}
                            />
                        )
                    }

                    <span className='blox block field check'/>
                </label>
            );
        case 'select':
            const selectHandler = useCallback((event) => {
                field.updater(field.options?.options[parseInt(event.target.value)]);
            }, []);

            return (
                <select
                    className='blox block field select'
                    onChange={selectHandler}
                >
                    {
                        field.options?.options?.map((option: [string, any], index: number) => ( // We use the index instead of the value because we don't know the type. For instance, they may want the value to be an object or a number.
                            <option value={index.toString()} key={JSON.stringify(option[1])}>
                                {option[0]}
                            </option>
                        ))
                    }
                </select>
            );
        default:
            return null;
    }
}
