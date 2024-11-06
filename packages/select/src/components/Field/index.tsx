import { ReactNode, cloneElement, isValidElement, useCallback, useMemo, useRef, useState } from 'react';

import { FormControl, FormControlSize, FormControlVariant } from '@ensi-platform/core-components-form-control';

import { EnumLike, defaultTheme } from '@ensi-platform/core-components-common';

import { useSelectTheme } from '../../context';
import { SelectItem } from '../../types';
import { FieldProps } from './types';

const { colors } = defaultTheme;

export const getValue = ({ selected }: { selected?: SelectItem[] }) => {
    if (!selected) return null;

    const options = Array.isArray(selected) ? selected : [selected] || [];

    if (!options.length) return null;

    return options.reduce((acc: Array<ReactNode | string>, option: SelectItem, index: number) => {
        if (isValidElement(option.content)) {
            acc.push(cloneElement(option.content, { key: option.label }));
        } else {
            acc.push(option.content || option.label);
        }

        if (index < options.length - 1 && options.length > 1) acc.push(', ');
        return acc;
    }, []);
};

const getSameEnumValue = <S extends EnumLike, D extends EnumLike>(
    val: keyof S | S,
    dest: D,
    fallback: D | undefined = undefined
) => {
    if (Object.keys(dest).includes(val.toString())) {
        return dest[val.toString()] as D[keyof D];
    }

    return fallback;
};

export const Field = ({
    isOpen,
    placeholder,
    selected,
    valueRenderer,
    Arrow,
    wrap = false,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setSelectedItems,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    toggleMenu,
    rightAddons,
    innerProps,
    ...restProps
}: FieldProps) => {
    const wrapperRef = useRef<HTMLDivElement>(null);

    const [focused, setFocused] = useState(false);
    const onFocus = useCallback(() => setFocused(true), []);
    const onBlur = useCallback(() => setFocused(false), []);

    const value = valueRenderer ? valueRenderer({ selected }) : getValue({ selected });

    const filled = Boolean(value);

    const { size, variant, getCSS } = useSelectTheme();

    const controlSize = getSameEnumValue(size, FormControlSize);
    const controlVariant = getSameEnumValue(variant, FormControlVariant);

    const totalFieldCSS = useMemo(() => getCSS('field'), [getCSS]);

    return (
        <div
            ref={wrapperRef}
            css={{
                width: '100%',
                outline: 'none!important',
            }}
            onFocus={onFocus}
            onBlur={onBlur}
        >
            <FormControl
                block
                size={controlSize}
                variant={controlVariant}
                focused={isOpen || focused}
                filled={filled}
                rightAddons={
                    (Arrow || rightAddons) && (
                        <>
                            {rightAddons}
                            {Arrow}
                        </>
                    )
                }
                {...restProps}
                {...innerProps}
            >
                <div className="control" css={totalFieldCSS}>
                    {placeholder && !filled && (
                        <span
                            css={{
                                color: colors.grey400,
                            }}
                        >
                            {placeholder}
                        </span>
                    )}
                    {filled && (
                        <div
                            css={{
                                ...(!wrap && {
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                }),
                                textAlign: 'left',
                            }}
                        >
                            {value}
                        </div>
                    )}
                </div>
            </FormControl>
        </div>
    );
};
