import { IconCheck, useMergeCSS, useThemeCSSPart } from '@ensi-platform/core-components-common';
import { FormMessage } from '@ensi-platform/core-components-form-control';

import { type CSSObject } from '@emotion/react';

import { forwardRef, useId, useMemo, useRef } from 'react';
import mergeRefs from 'react-merge-refs';

import { useFocus } from './scripts/hooks';
import { checkboxThemes } from './themes';
import { CheckboxSizeEnum, type CheckboxThemeStateType, CheckboxVariantEnum, type ICheckboxProps } from './types';

export * from './types';

export { checkboxThemes, CheckboxSizeEnum, CheckboxVariantEnum };

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
            hideError,

            block,
            disabled,
            indeterminate = false,

            className,
            align = 'start',

            theme: themeName = 'basic',
            variant = 'primary',
            size = 'md',

            css = DEFAULT_CSS,
            labelCSS: labelCSSProp = DEFAULT_CSS,
            boxCSS: boxCSSProp = DEFAULT_CSS,
            messageCSS: messageCSSProp = DEFAULT_CSS,
            hintCSS: hintCSSProp = DEFAULT_CSS,
            iconCSS: iconCSSProp = DEFAULT_CSS,
            indeterminateLineCSS: indeterminateLineCSSProp = DEFAULT_CSS,

            onChange,
            ...restProps
        },
        ref
    ) => {
        const inputId = useId();
        const labelRef = useRef<HTMLLabelElement>(null);

        const [focused] = useFocus(labelRef, 'keyboard');

        const theme = typeof themeName === 'string' ? checkboxThemes[themeName] : themeName;
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

        const getCSS = useThemeCSSPart(theme, themeState);

        const containerCSS = useMergeCSS(getCSS('container'), css);
        const labelCSS = useMergeCSS(getCSS('label'), labelCSSProp);
        const boxCSS = useMergeCSS(getCSS('box'), boxCSSProp);
        const messageCSS = useMergeCSS(getCSS('message'), messageCSSProp);
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
            <div css={containerCSS}>
                <label className={className} css={labelCSS} ref={mergeRefs([labelRef, ref])}>
                    <input
                        type="checkbox"
                        aria-invalid={!!error}
                        aria-describedby={`${inputId}-hint`}
                        aria-errormessage={`${inputId}-error`}
                        id={inputId}
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

                    {children && <span>{children}</span>}
                </label>

                {(hint || (error && !hideError)) && (
                    <div css={messageCSS}>
                        {hint && (
                            <span id={`${inputId}-hint`} css={hintCSS}>
                                {hint}
                            </span>
                        )}

                        {error && !hideError && <FormMessage type="error" id={`${inputId}-error`} message={error} />}
                    </div>
                )}
            </div>
        );
    }
);
