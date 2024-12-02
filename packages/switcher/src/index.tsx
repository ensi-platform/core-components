import { useThemeCSSPart } from '@ensi-platform/core-components-common';

import type { CSSObject } from '@emotion/react';

import deepmerge from 'deepmerge';
import { type ChangeEvent, useCallback, useMemo, useRef } from 'react';
import mergeRefs from 'react-merge-refs';

import { switcherThemes } from './themes';
import type { SwitcherProps, SwitcherThemeState } from './types';

export * from './types';

/**
 * Компонент переключателя
 */
export const Switcher = ({
    name,
    field,
    value = '',
    error,
    inputCSS: propsInputCSS,
    labelCSS: propsLabelCSS,
    inputRef,
    className,
    theme: themeName = 'basic',
    size = 'md',
    variant = 'primary',
    css,
    checked: propChecked,
    allowUnselectDisabledOptions = false,
    disabled,
    onChange,
    ...props
}: SwitcherProps) => {
    const inputId = `${name}-${value}-${props.id}`;
    const ref = useRef<HTMLInputElement>(null);

    const theme = typeof themeName === 'string' ? switcherThemes[themeName] : themeName;

    const checked = typeof field?.value === 'boolean' ? field?.value : !!propChecked;

    const handleChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            field?.onChange(e);
            onChange?.(e);
        },
        [field, onChange]
    );

    const state = useMemo<Omit<SwitcherThemeState, 'theme'>>(
        () => ({
            checked,
            size,
            variant,
            hasError: !!error,
        }),
        [checked, size, variant, error]
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
        <div className={className} css={css}>
            <input
                name={name}
                id={inputId}
                type="checkbox"
                checked={checked}
                value={value}
                ref={mergeRefs([inputRef!, ref])}
                css={inputCSS}
                onChange={handleChange}
                disabled={allowUnselectDisabledOptions && checked ? false : disabled}
            />
            <label htmlFor={inputId} css={labelCSS} />
        </div>
    );
};
