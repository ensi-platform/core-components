import { IconCheck, useMergeCSS, useThemeCSSPart } from '@ensi-platform/core-components-common';
import { FormMessage } from '@ensi-platform/core-components-form-control';

import { type CSSObject } from '@emotion/react';

import { forwardRef, useMemo, useRef } from 'react';
import mergeRefs from 'react-merge-refs';

import { useFocus } from './scripts/hooks';
import { checkboxThemes } from './themes/defaultTheme';
import { CheckboxSize, type CheckboxThemeStateType, CheckboxVariant, type ICheckboxProps } from './types';

export * from './types';

export { checkboxThemes, CheckboxSize, CheckboxVariant };

const DEFAULT_CSS = {};

/**
 * Basic checkbox component
 */
export const Checkbox = forwardRef<HTMLLabelElement, ICheckboxProps>(
    (
        {
            checked,
            children,
            hint,
            error,

            block,
            disabled,
            indeterminate = false,

            className,
            align = 'start',
            variant = CheckboxVariant.primary,
            size = CheckboxSize.md,

            css = DEFAULT_CSS,
            labelCSS: labelCSSProp = DEFAULT_CSS,
            boxCSS: boxCSSProp = DEFAULT_CSS,
            contentCSS: contentCSSProp = DEFAULT_CSS,
            hintCSS: hintCSSProp = DEFAULT_CSS,
            iconCSS: iconCSSProp = DEFAULT_CSS,
            indeterminateLineCSS: indeterminateLineCSSProp = DEFAULT_CSS,

            onChange,
            ...restProps
        },
        ref
    ) => {
        const labelRef = useRef<HTMLLabelElement>(null);

        const [focused] = useFocus(labelRef, 'keyboard');

        const themeState = useMemo<CheckboxThemeStateType>(
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

        const containerCSS = useMergeCSS(getCSS('container'), css);
        const labelCSS = useMergeCSS(
            {
                display: 'block',
            },
            labelCSSProp
        );

        const boxCSS = useMergeCSS(getCSS('box'), boxCSSProp);
        const contentCSS = useMergeCSS(getCSS('content'), contentCSSProp);
        const hintCSS = useMergeCSS(getCSS('hint'), hintCSSProp);

        const iconCSS = useMergeCSS(getCSS('icon'), iconCSSProp);
        const indeterminateLineCSS = useMergeCSS(getCSS('indeterminateLine'), indeterminateLineCSSProp);

        const inputCSS = useMemo<CSSObject>(
            () => ({
                position: 'absolute',
                opacity: 0,
                zIndex: -1,
            }),
            []
        );

        return (
            <label className={className} css={containerCSS} ref={mergeRefs([labelRef, ref])}>
                <input
                    type="checkbox"
                    css={inputCSS}
                    checked={checked}
                    disabled={disabled}
                    onChange={onChange}
                    {...restProps}
                />

                <span css={boxCSS}>
                    <IconCheck css={iconCSS} />
                    {indeterminate && !checked && <span css={indeterminateLineCSS} />}
                </span>

                {(children || hint || error) && (
                    <span css={contentCSS}>
                        {children && <span css={labelCSS}>{children}</span>}

                        {hint && !error && <span css={hintCSS}>{hint}</span>}

                        {error && <FormMessage message={error} type="error" />}
                    </span>
                )}
            </label>
        );
    }
);
