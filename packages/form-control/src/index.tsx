import { CSSObject } from '@emotion/react';
import deepmerge from 'deepmerge';
import { forwardRef, useMemo } from 'react';

import { useThemeCSSPart } from '@greensight/core-components-common';

import { formControlThemes } from './themes/defaultTheme';
import { FormControlProps, FormControlThemeState } from './types';

export * from './types';

const EMPTY_OBJECT: any = {};

export const FormControl = forwardRef<HTMLDivElement, FormControlProps>(
    (
        {
            block = false,
            theme = formControlThemes.basic,
            errorPlacement = 'above',
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
                errorPlacement,
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
                errorPlacement,
            ]
        );

        const getCSS = useThemeCSSPart(theme, state);

        const totalWrapperCSS = useMemo(
            () => deepmerge.all<CSSObject>([getCSS('wrapper'), wrapperCSS!]),
            [wrapperCSS, getCSS]
        );

        const innerCSS = useMemo(() => deepmerge.all<CSSObject>([getCSS('inner'), fieldCSS!]), [fieldCSS, getCSS]);

        const totalClearCSS = useMemo(() => getCSS('clear'), [getCSS]);

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
                {errorMessage && errorPlacement === 'above' && <p css={getCSS('error')}>{errorMessage}</p>}
                <div {...restProps} css={{ ...innerCSS, '.clear': totalClearCSS }} ref={ref}>
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

                {errorMessage && errorPlacement === 'under' && <p css={getCSS('error')}>{errorMessage}</p>}

                {bottomAddons}

                {hint && !errorMessage && <span css={getCSS('sub') as CSSObject}>{hint}</span>}
            </div>
        );
    }
);

FormControl.displayName = 'FormControl';
