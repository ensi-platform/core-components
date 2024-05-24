import { CSSObject } from '@emotion/react';

import { forwardRef, useMemo, useRef } from 'react';
import mergeRefs from 'react-merge-refs';
import deepmerge from 'deepmerge';

import { IconCheck, useCheckboxLikeControlHookRHF, useThemeCSSPart } from '@greensight/core-components-common';

import { useFocus } from './scripts/hooks';
import { CheckboxProps, CheckboxSize, CheckboxThemeState, CheckboxVariant } from './types';
import { checkboxThemes } from './defaultTheme';

export * from './types';

export { checkboxThemes, CheckboxSize, CheckboxVariant };

export const Checkbox = forwardRef<HTMLLabelElement, CheckboxProps>(
    (
        {
            checked: propsChecked,
            children,
            label = children,
            hint,
            boxCSS,
            contentCSS,
            align = 'start',
            addons,
            block,
            onChange,
            className,
            name,
            disabled,
            inactive,
            indeterminate = false,
            hiddenInput = false,
            meta,
            variant = 'primary',
            size = 'md',
            theme = checkboxThemes.basic,
            css,
            useControlHook = useCheckboxLikeControlHookRHF,
            ...restProps
        },
        ref
    ) => {
        const labelRef = useRef<HTMLLabelElement>(null);

        const { checked, handleChange } = useControlHook(name!, onChange!, propsChecked);

        const [focused] = useFocus(labelRef, 'keyboard');

        const themeState = useMemo<CheckboxThemeState>(
            () => ({
                align,
                block,
                checked,
                disabled: disabled || restProps.readOnly,
                error: !!meta?.error,
                focused,
                inactive,
                indeterminate,
                variant,
                size,
            }),
            [align, block, checked, disabled, meta, focused, inactive, indeterminate, restProps.readOnly, size, variant]
        );

        const getCSS = useThemeCSSPart(theme, themeState);

        const errorMessage = typeof meta?.error === 'boolean' ? '' : meta?.error;

        return (
            // eslint-disable-next-line jsx-a11y/label-has-associated-control
            <label
                className={className}
                css={deepmerge.all<CSSObject>([getCSS('container'), css || {}])}
                ref={mergeRefs([labelRef, ref])}
            >
                {!hiddenInput && (
                    <input
                        type="checkbox"
                        onChange={handleChange}
                        disabled={disabled || inactive}
                        checked={checked}
                        {...restProps}
                        css={{ position: 'absolute', opacity: 0, zIndex: -1 }}
                    />
                )}
                <span css={deepmerge.all<CSSObject>([getCSS('box'), boxCSS || {}])}>
                    <IconCheck css={getCSS('icon')} />
                    {indeterminate && !checked && <span css={getCSS('indeterminateLine')} />}
                </span>

                {(label || hint || errorMessage) && (
                    <span css={deepmerge.all<CSSObject>([getCSS('content'), contentCSS || {}])}>
                        {label && (
                            <span
                                css={{
                                    display: 'block',
                                }}
                            >
                                {label}
                            </span>
                        )}

                        {hint && !errorMessage && <span css={getCSS('hint')}>{hint}</span>}

                        {errorMessage && (
                            <span css={getCSS('error')} role="alert">
                                {errorMessage}
                            </span>
                        )}
                    </span>
                )}

                {addons && <span css={getCSS('addons')}>{addons}</span>}
            </label>
        );
    }
);
