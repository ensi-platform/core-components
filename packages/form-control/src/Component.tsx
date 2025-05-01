import { useThemeCSSPart } from '@ensi-platform/core-components-common';

import { type CSSObject } from '@emotion/react';

import deepmerge from 'deepmerge';
import { forwardRef, useCallback, useMemo } from 'react';

import FormControlError from './components/FormControlError';
import { formControlThemes } from './themes/index';
import {
    type TErrorAdditionalProps,
    type TErrorProps,
    type TFormControlProps,
    type TFormControlThemeState,
    type TLabelAdditionalProps,
    type TLabelProps,
} from './types';
import { getPartComponent } from './utils/getPartComponent';

const CSS_EMPTY_OBJECT: CSSObject = {};

export const FormControl = forwardRef<HTMLDivElement, TFormControlProps>(
    (
        {
            block = false,
            theme: themeProp = 'basic',
            size = 'md',
            variant = 'primary',
            className,
            fieldCSS = CSS_EMPTY_OBJECT,
            controlWrapperCSS = CSS_EMPTY_OBJECT,
            disabled,
            readOnly,
            focused,
            filled,
            error: errorProp,
            hint: hintProp,
            label: labelProp,
            leftAddons: leftAddonsProp,
            rightAddons: rightAddonsProp,
            bottomAddons,
            children,
            htmlFor,
            labelWrap = false,
            ...restProps
        },
        ref
    ) => {
        const theme = typeof themeProp === 'string' ? formControlThemes[themeProp] : themeProp;

        const {
            Component: label,
            css: labelCSS,
            className: labelClassName,
            props: labelProps,
        } = useMemo(() => getPartComponent<TLabelAdditionalProps, TLabelProps>(labelProp), [labelProp]);
        const {
            Component: leftAddons,
            css: leftAddonsOutsideCSS,
            className: leftAddonsClassName,
        } = useMemo(() => getPartComponent(leftAddonsProp), [leftAddonsProp]);
        const {
            Component: rightAddons,
            css: rightAddonsOutsideCSS,
            className: rightAddonsClassName,
        } = useMemo(() => getPartComponent(rightAddonsProp), [rightAddonsProp]);

        const {
            Component: hint,
            css: hintOutsideCSS,
            className: hintClassName,
        } = useMemo(() => getPartComponent(hintProp), [hintProp]);

        const {
            Component: error,
            css: errorOutsideCSS,
            className: errorClassName,
            visible: errorVisible = true,
            placement: errorPlacement = 'above',
        } = useMemo(() => getPartComponent<TErrorAdditionalProps, TErrorProps>(errorProp), [errorProp]);

        // eslint-disable-next-line no-nested-ternary
        const errorMessage = errorVisible ? error : '';

        const hasError = !!error;

        const hasLeftAddons = !!leftAddons;
        const hasRightAddons = !!rightAddons || !!error;

        const state = useMemo<Omit<TFormControlThemeState, 'theme'>>(
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

        const wrapperCSS = useMemo(() => getCSS('wrapper'), [getCSS]);
        const fieldInnerCSS = useMemo(() => deepmerge.all<CSSObject>([getCSS('field'), fieldCSS!]), [fieldCSS, getCSS]);
        const hintCSS = useMemo(
            () => deepmerge.all<CSSObject>([getCSS('hint'), hintOutsideCSS]),
            [getCSS, hintOutsideCSS]
        );
        const leftAddonsCSS = useMemo(
            () => deepmerge.all<CSSObject>([getCSS('addons', { isLeft: true }), leftAddonsOutsideCSS]),
            [getCSS, leftAddonsOutsideCSS]
        );
        const rightAddonsCSS = useMemo(
            () => deepmerge.all<CSSObject>([getCSS('addons', { isLeft: false }), rightAddonsOutsideCSS]),
            [getCSS, rightAddonsOutsideCSS]
        );
        const errorCSS = useMemo(
            () => deepmerge.all<CSSObject>([getCSS('error'), errorOutsideCSS]),
            [getCSS, errorOutsideCSS]
        );
        const totalClearCSS = useMemo(() => getCSS('clear'), [getCSS]);

        const labelInnerProps = useMemo(
            () => ({
                css: {
                    ...(getCSS('label') as CSSObject),
                    ...labelCSS,
                },
                title: !labelWrap && typeof label === 'string' ? label : undefined,
            }),
            [getCSS, label, labelCSS, labelWrap]
        );

        const controlWrapperInnerCSS = useMemo(
            () =>
                deepmerge.all<CSSObject>([
                    {
                        flexGrow: 1,
                        ...(!labelWrap && {
                            textOverflow: 'ellipsis',
                            overflow: 'hidden',
                        }),
                        '.control': getCSS('control'),
                    },
                    controlWrapperCSS,
                ]),
            [controlWrapperCSS, getCSS, labelWrap]
        );

        const FormMessageComponent = useCallback(
            () => (
                <FormControlError className={errorClassName} css={errorCSS} type="error">
                    {errorMessage}
                </FormControlError>
            ),
            [errorCSS, errorClassName, errorMessage]
        );

        return (
            <div className={className} css={wrapperCSS}>
                {label && (
                    <label htmlFor={htmlFor} className={labelClassName} {...labelInnerProps} {...labelProps}>
                        {label}
                    </label>
                )}

                {errorMessage && errorPlacement === 'above' && <FormMessageComponent />}

                <div {...restProps} css={{ ...fieldInnerCSS, '.clear': totalClearCSS }} ref={ref}>
                    {leftAddons && (
                        <div className={leftAddonsClassName} css={leftAddonsCSS}>
                            {leftAddons}
                        </div>
                    )}

                    <div css={controlWrapperInnerCSS}>{children}</div>
                    {rightAddons && (
                        <div className={rightAddonsClassName} css={rightAddonsCSS}>
                            {rightAddons}
                        </div>
                    )}
                </div>

                {errorMessage && errorPlacement === 'under' && <FormMessageComponent />}

                {bottomAddons}

                {hint && (
                    <span className={hintClassName} css={hintCSS}>
                        {hint}
                    </span>
                )}
            </div>
        );
    }
);
