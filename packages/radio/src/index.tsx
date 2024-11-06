import { CSSObject } from '@emotion/react';
import deepmerge from 'deepmerge';
import { useMemo, useRef } from 'react';
import mergeRefs from 'react-merge-refs';

import { useCheckboxLikeControlHookRHF, useThemeCSSPart } from '@ensi-platform/core-components-common';

import { radioThemes } from './themes';
import { RadioProps, RadioThemeState } from './types';

export * from './types';

export const Radio = ({
    name,
    value,
    label,
    error,
    inputRef: innerRef,
    children,
    className,
    theme: themeName = 'basic',
    size = 'md',
    variant = 'primary',
    checked: propsChecked,
    allowUnselectDisabledOptions = false,
    disabled,
    inputCSS: propsInputCSS,
    labelCSS: propsLabelCSS,
    wrapperCSS,
    view = 'padded-knob',
    onChange,
    useControlHook = useCheckboxLikeControlHookRHF,
    ...props
}: RadioProps) => {
    const inputId = `${name}-${value}-${props.id}`;

    const { checked, handleChange } = useControlHook(name!, onChange!, propsChecked);

    const ref = useRef<HTMLInputElement>(null);

    const theme = typeof themeName === 'string' ? radioThemes[themeName] : themeName;
    const state = useMemo<Omit<RadioThemeState, 'theme'>>(
        () => ({
            checked,
            size,
            variant,
            hasError: !!error,
            disabled,
            readOnly: props.readOnly,
            disabledCanUnselect: allowUnselectDisabledOptions && checked && disabled,
            view,
        }),
        [view, checked, size, variant, error, disabled, props.readOnly, allowUnselectDisabledOptions]
    );

    const getCSS = useThemeCSSPart(theme, state);

    const inputCSS = useMemo(
        () => deepmerge.all<CSSObject>([getCSS('input'), propsInputCSS || {}]),
        [getCSS, propsInputCSS]
    );
    const labelCSS = useMemo(
        () => deepmerge.all<CSSObject>([getCSS('label'), propsLabelCSS || {}]),
        [getCSS, propsLabelCSS]
    );

    return (
        <div className={className} css={wrapperCSS}>
            <input
                {...props}
                name={name}
                id={inputId}
                type="radio"
                checked={checked}
                value={value}
                ref={mergeRefs([innerRef!, ref])}
                css={inputCSS}
                onChange={handleChange}
                disabled={allowUnselectDisabledOptions && checked ? false : disabled}
            />
            <label htmlFor={inputId} css={labelCSS}>
                {children || label}
            </label>
        </div>
    );
};
