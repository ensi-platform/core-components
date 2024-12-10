import {
    type EnumLike,
    emptyCSS,
    useCheckboxLikeControlHookRHF,
    useMergeCSS,
    useThemeCSSPart,
} from '@ensi-platform/core-components-common';
import { FormMessage } from '@ensi-platform/core-components-form-control';

import { type Ref, forwardRef, useId, useMemo } from 'react';

import { RadioSizesEnum, RadioVariantsEnum } from './scripts';
import { RADIO_THEMES } from './themes';
import type { IRadioProps, RadioStateFullType, RadioThemeType } from './types';

export * from './types';

const BaseRadio = <V extends EnumLike, S extends EnumLike>(
    {
        name,
        value,
        label = '',
        error = '',

        theme,
        size,
        variant,

        checked: checkedProp = false,
        disabled = false,

        containerCSS: containerCSSProp = emptyCSS,
        labelCSS: labelCSSProp = emptyCSS,
        inputCSS: inputCSSProp = emptyCSS,
        radioCSS: radioCSSProp = emptyCSS,
        errorCSS,
        className,

        onChange,
        useControlHook = useCheckboxLikeControlHookRHF,

        children,
        ...props
    }: IRadioProps<V, S>,
    ref: Ref<HTMLInputElement> = null
) => {
    const inputId = useId();

    const { checked, handleChange } = useControlHook(name!, onChange!, checkedProp);

    const state = useMemo<RadioStateFullType<V, S>>(
        () => ({
            disabled,
            checked,
            variant,
            size,
            error,
        }),
        [disabled, checked, variant, size, error]
    );

    const getCSS = useThemeCSSPart(theme!, state);

    const containerCSS = useMergeCSS(getCSS('container'), containerCSSProp);
    const labelCSS = useMergeCSS(getCSS('label'), labelCSSProp);
    const inputCSS = useMergeCSS(getCSS('input'), inputCSSProp);
    const radioCSS = useMergeCSS(getCSS('radio'), radioCSSProp);

    return (
        <div css={containerCSS} className={className}>
            <label htmlFor={inputId} css={labelCSS}>
                <input
                    {...props}
                    type="radio"
                    tabIndex={0}
                    id={inputId}
                    value={value}
                    name={name}
                    disabled={disabled}
                    checked={checked}
                    ref={ref}
                    onChange={handleChange}
                    css={inputCSS}
                />
                <span css={radioCSS} />
                <span>{children || label}</span>
            </label>
            {error && <FormMessage type="error" message={error} css={{ errorCSS }} />}
        </div>
    );
};

const createRadioWithTheme = <V extends EnumLike, S extends EnumLike>(
    defaultTheme: RadioThemeType<V, S>,
    defaultVariant: V | keyof V,
    defaultSize: S | keyof S
) => {
    const RadioRef = forwardRef<HTMLInputElement, IRadioProps<V, S>>(BaseRadio<V, S>);

    const ThemedRadio = forwardRef<HTMLInputElement, IRadioProps<V, S>>(
        ({ theme = defaultTheme, variant = defaultVariant, size = defaultSize, ...props }, ref) => (
            <RadioRef ref={ref} theme={theme} variant={variant} size={size} {...props} />
        )
    );

    return ThemedRadio;
};

const Radio = createRadioWithTheme<typeof RadioVariantsEnum, typeof RadioSizesEnum>(
    RADIO_THEMES.basic,
    RadioVariantsEnum.primary,
    RadioSizesEnum.md
);

export default Radio;
