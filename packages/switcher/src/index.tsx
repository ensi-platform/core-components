import { CSSObject } from '@emotion/react';
import deepmerge from 'deepmerge';
import { useMemo, useRef } from 'react';
import mergeRefs from 'react-merge-refs';

import { useCheckboxLikeControlHookRHF, useThemeCSSPart } from '@greensight/core-components-common';

import { switcherThemes } from './themes';
import { SwitcherProps, SwitcherThemeState } from './types';

export * from './types';

/**
 * Компонент переключателя
 */
export const Switcher = ({
    name,
    value,
    error,
    inputCSS: propsInputCSS,
    labelCSS: propsLabelCSS,
    inputRef,
    className,
    theme: themeName = 'basic',
    size = 'md',
    variant = 'primary',
    css,
    checked: propsChecked,
    allowUnselectDisabledOptions = false,
    disabled,
    onChange,
    useControlHook = useCheckboxLikeControlHookRHF,
    ...props
}: SwitcherProps) => {
    const inputId = `${name}-${value}-${props.id}`;
    const ref = useRef<HTMLInputElement>(null);

    const theme = typeof themeName === 'string' ? switcherThemes[themeName] : themeName;

    const { checked, handleChange } = useControlHook(name!, onChange!, propsChecked);

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
