import {
    type EnumLike,
    emptyCSS,
    formatPrice,
    useMergeCSS,
    useThemeCSSPart,
} from '@ensi-platform/core-components-common';

import { type FC, useMemo } from 'react';

import { PriceSizes, PriceVariants } from './scripts';
import { PRICE_THEMES } from './themes';
import type { IPriceProps, PriceStateFullType, PriceThemeType } from './types';

const BasePrice = <V extends EnumLike, S extends EnumLike>({
    preText,
    value,
    unit = '₽',
    typography = 'bodyMd',
    unitTypography = 'bodyMd',
    variant,
    size,
    theme,
    containerCSS: containerCSSProp = emptyCSS,
    valueCSS: valueCSSProp = emptyCSS,
    preTextCSS: preTextCSSProp = emptyCSS,
    unitCSS: unitCSSProp = emptyCSS,
    className,
    hideUnit = false,
    isCrossed = false,
}: IPriceProps<V, S>) => {
    const state = useMemo<PriceStateFullType<V, S>>(
        () => ({ typography, isCrossed, variant, size, unitTypography }),
        [typography, isCrossed, size, variant, unitTypography]
    );

    const getCSS = useThemeCSSPart(theme!, state);

    const containerCSS = useMergeCSS(getCSS('container'), containerCSSProp);
    const preTextCSS = useMergeCSS(getCSS('preText'), valueCSSProp);
    const valueCSS = useMergeCSS(getCSS('value'), preTextCSSProp);
    const unitCSS = useMergeCSS(getCSS('unit'), unitCSSProp);

    return (
        <div css={containerCSS} className={className}>
            {preText && <span css={preTextCSS}>{preText} </span>}
            <span css={valueCSS}>{formatPrice(value, 'ru')}</span>
            {!hideUnit && <span css={unitCSS}> {unit}</span>}
        </div>
    );
};

const createPriceWithTheme = <V extends EnumLike, S extends EnumLike>(
    defaultTheme: PriceThemeType<V, S>,
    defaultVariant: V | keyof V,
    defaultSize: S | keyof S
): FC<IPriceProps<V, S>> => {
    const ThemedPrice = ({
        theme = defaultTheme,
        variant = defaultVariant,
        size = defaultSize,
        ...props
    }: IPriceProps<V, S>) => <BasePrice theme={theme} variant={variant} size={size} {...props} />;

    return ThemedPrice;
};

const Price = createPriceWithTheme<typeof PriceVariants, typeof PriceSizes>(
    PRICE_THEMES.basic,
    PriceVariants.primary,
    PriceSizes.md
);

export default Price;
