import { Input as DefaultInput } from '@ensi-platform/core-components-input';

import { type MouseEvent, type Ref, useCallback, useMemo, useRef } from 'react';
import mergeRefs from 'react-merge-refs';

import type { AutocompleteFieldPropsType } from '../Autocomplete/types';

const EMPTY_OBJ = {};

export const AutocompleteField = ({
    Arrow,
    name,
    error,
    label,
    size,
    Input = DefaultInput,
    value,
    hint,
    disabled,
    readOnly,
    onInput,
    inputProps = EMPTY_OBJ,
    bottomAddons,
    innerProps,
    rightAddons,
    className,
}: AutocompleteFieldPropsType) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const { onClick, onFocus } = innerProps;

    const inputDisabled = disabled || readOnly;

    const handleClick = useCallback(
        (event: MouseEvent<HTMLDivElement>) => {
            if (onClick) onClick(event);

            if (inputRef.current) {
                inputRef.current.focus();
            }
        },
        [onClick]
    );

    const inputPropsMerged = useMemo(
        () => ({
            ...inputProps,
            ...innerProps,
        }),
        [innerProps, inputProps]
    );

    return (
        <Input
            {...inputPropsMerged}
            wrapperRef={mergeRefs([innerProps.ref as Ref<HTMLElement>, inputProps.wrapperRef as Ref<HTMLElement>])}
            ref={mergeRefs([inputRef, inputProps.ref as Ref<HTMLElement>])}
            name={name}
            disabled={disabled}
            readOnly={readOnly}
            block
            label={label}
            size={size}
            error={error}
            hint={hint}
            onChange={onInput}
            onClick={inputDisabled ? undefined : handleClick}
            onFocus={inputDisabled ? undefined : onFocus}
            autoComplete="off"
            value={value}
            className={`control ${className}`}
            bottomAddons={bottomAddons}
            rightAddons={
                (rightAddons || Arrow) && (
                    <>
                        {rightAddons}
                        {Arrow}
                    </>
                )
            }
        />
    );
};

AutocompleteField.displayName = 'AutocompleteField';
