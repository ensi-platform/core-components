import { type CSSObject } from '@emotion/react';

import { forwardRef, useMemo, useRef } from 'react';
import mergeRefs from 'react-merge-refs';
import deepmerge from 'deepmerge';

import { IconCheck, useThemeCSSPart } from '@greensight/core-components-common';

import { useFocus } from './scripts/hooks';
import { CheckboxSize, type CheckboxThemeState, CheckboxVariant, type ICheckboxProps } from './types';
import { checkboxThemes } from './defaultTheme';

export * from './types';

export { checkboxThemes, CheckboxSize, CheckboxVariant };

const DEFAULT_CSS = {};

export const Checkbox = forwardRef<HTMLLabelElement, ICheckboxProps>(
    (
        {
            checked,
            children,
            hint,

            align = 'start',
            block,
            onChange,
            className,
            disabled,
            indeterminate = false,
            variant = CheckboxVariant.primary,
            size = CheckboxSize.md,

            css = DEFAULT_CSS,
            labelCSS: labelCSSProp = DEFAULT_CSS,
            boxCSS: boxCSSProp = DEFAULT_CSS,
            contentCSS: contentCSSProp = DEFAULT_CSS,
            hintCSS: hintCSSProp = DEFAULT_CSS,
            errorCSS: errorCSSProp = DEFAULT_CSS,
            iconCSS: iconCSSProp = DEFAULT_CSS,
            indeterminateLineCSS: indeterminateLineCSSProp = DEFAULT_CSS,

            error,
            ...restProps
        },
        ref
    ) => {
        const labelRef = useRef<HTMLLabelElement>(null);

        const [focused] = useFocus(labelRef, 'keyboard');

        const themeState = useMemo<CheckboxThemeState>(
            () => ({
                align,
                block,
                checked,
                disabled: disabled || restProps.readOnly,
                error,
                focused,
                indeterminate,
                variant,
                size,
            }),
            [align, block, checked, disabled, error, focused, indeterminate, restProps.readOnly, size, variant]
        );

        const getCSS = useThemeCSSPart(checkboxThemes.basic, themeState);

        const containerCSS = useMemo(() => deepmerge.all<CSSObject>([getCSS('container'), css]), [css, getCSS]);
        const labelCSS = useMemo(
            () =>
                deepmerge.all<CSSObject>([
                    {
                        display: 'block',
                    },
                    labelCSSProp,
                ]),
            [labelCSSProp]
        );

        const boxCSS = useMemo(() => deepmerge.all<CSSObject>([getCSS('box'), boxCSSProp]), [boxCSSProp, getCSS]);
        const contentCSS = useMemo(
            () => deepmerge.all<CSSObject>([getCSS('content'), contentCSSProp]),
            [contentCSSProp, getCSS]
        );
        const hintCSS = useMemo(() => deepmerge.all<CSSObject>([getCSS('hint'), hintCSSProp]), [hintCSSProp, getCSS]);
        const errorCSS = useMemo(
            () => deepmerge.all<CSSObject>([getCSS('error'), errorCSSProp]),
            [errorCSSProp, getCSS]
        );

        const iconCSS = useMemo(() => deepmerge.all<CSSObject>([getCSS('icon'), iconCSSProp]), [iconCSSProp, getCSS]);
        const indeterminateLineCSS = useMemo(
            () => deepmerge.all<CSSObject>([getCSS('indeterminateLine'), indeterminateLineCSSProp]),
            [indeterminateLineCSSProp, getCSS]
        );
        return (
            <label className={className} css={containerCSS} ref={mergeRefs([labelRef, ref])}>
                <input
                    type="checkbox"
                    onChange={onChange}
                    disabled={disabled}
                    checked={checked}
                    {...restProps}
                    css={{ position: 'absolute', opacity: 0, zIndex: -1 }}
                />
                <span css={boxCSS}>
                    <IconCheck css={iconCSS} />
                    {indeterminate && !checked && <span css={indeterminateLineCSS} />}
                </span>

                {(children || hint || error) && (
                    <span css={contentCSS}>
                        {children && <span css={labelCSS}>{children}</span>}

                        {hint && !error && <span css={hintCSS}>{hint}</span>}

                        {error && (
                            <span css={errorCSS} role="alert">
                                {error}
                            </span>
                        )}
                    </span>
                )}
            </label>
        );
    }
);
