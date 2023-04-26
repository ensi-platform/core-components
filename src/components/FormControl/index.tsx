import { CSSObject } from '@emotion/core';
import deepmerge from 'deepmerge';
import { forwardRef, useMemo } from 'react';

import FormMessage from '@components/Form/Message';

import { scale, useThemeCSSPart } from '@scripts/gds';

import { formControlThemes } from './themes';
import { FormControlProps, FormControlThemeState } from './types';

export * from './types';

const EMPTY_OBJECT: any = {};

const FormControl = forwardRef<HTMLDivElement, FormControlProps>(
    (
        {
            block = false,
            theme: themeName = 'basic',
            size = 'md',
            variant = 'primary',
            className,
            labelCSS = EMPTY_OBJECT,
            fieldCSS = EMPTY_OBJECT,
            leftAddonsCSS = EMPTY_OBJECT,
            rightAddonsCSS = EMPTY_OBJECT,
            wrapperCSS = EMPTY_OBJECT,
            disabled,
            readOnly,
            focused,
            filled,
            error,
            hint,
            label,
            leftAddons,
            rightAddons,
            bottomAddons,
            children,
            htmlFor,
            labelWrap = false,
            labelProps = EMPTY_OBJECT,
            showError = true,
            ...restProps
        },
        ref
    ) => {
        const theme = typeof themeName === 'string' ? formControlThemes[themeName] : themeName;
        // eslint-disable-next-line no-nested-ternary
        const errorMessage = (showError ? (typeof error === 'boolean' ? '' : error) : '') as string;

        const hasError = !!error;

        const hasLeftAddons = !!leftAddons;
        const hasRightAddons = !!rightAddons || !!error;

        const state = useMemo<Omit<FormControlThemeState, 'theme'>>(
            () => ({
                block,
                disabled,
                filled,
                focused,
                hasError,
                readOnly,
                size,
                hasLeftAddons,
                hasRightAddons,
                labelWrap,
                variant,
            }),
            [
                block,
                disabled,
                filled,
                focused,
                hasError,
                readOnly,
                size,
                hasLeftAddons,
                hasRightAddons,
                labelWrap,
                variant,
            ]
        );

        const getCSS = useThemeCSSPart(theme, state);

        const totalWrapperCSS = useMemo(
            () => deepmerge.all<CSSObject>([getCSS('wrapper'), wrapperCSS!]),
            [wrapperCSS, getCSS]
        );

        const innerCSS = useMemo(() => deepmerge.all<CSSObject>([getCSS('inner'), fieldCSS!]), [fieldCSS, getCSS]);

        return (
            <div className={className} css={totalWrapperCSS}>
                {label && (
                    <label
                        htmlFor={htmlFor}
                        css={{
                            ...(getCSS('label') as CSSObject),
                            ...labelCSS,
                        }}
                        {...(!labelWrap &&
                            typeof label === 'string' && {
                                title: label,
                            })}
                        {...labelProps}
                    >
                        {label}
                    </label>
                )}
                {errorMessage && <FormMessage message={errorMessage} css={{ marginBottom: scale(1) }} type="error" />}
                <div {...restProps} css={innerCSS} ref={ref}>
                    {leftAddons && (
                        <div css={deepmerge.all<CSSObject>([getCSS('addons', { isLeft: true }), leftAddonsCSS])}>
                            {leftAddons}
                        </div>
                    )}

                    <div
                        css={{
                            flexGrow: 1,
                            ...(!labelWrap && {
                                textOverflow: 'ellipsis',
                                overflow: 'hidden',
                            }),
                            '.control': getCSS('controlWrapper') as CSSObject,
                        }}
                    >
                        {children}
                    </div>
                    {rightAddons && (
                        <div css={deepmerge.all<CSSObject>([getCSS('addons', { isLeft: false }), rightAddonsCSS])}>
                            {rightAddons}
                        </div>
                    )}
                </div>

                {bottomAddons}

                {hint && !errorMessage && <span css={getCSS('sub') as CSSObject}>{hint}</span>}
            </div>
        );
    }
);

FormControl.displayName = 'FormControl';

export default FormControl;
