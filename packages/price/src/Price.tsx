import { formatPrice, useThemeCSSPart, type EnumLike } from '@greensight/core-components-common';
import { type FC, useMemo } from 'react';
import { type IPriceTheme, type IPriceProps, type PriceStateFullType } from './types';
import { PRICE_THEMES } from './themes';
import { emptyCSS, PriceSizes, PriceVariants, useMergeCSS } from './scripts';

const BasePrice = <V extends EnumLike, S extends EnumLike>({
    typography = 'bodyMd',
    isCrossed = false,
    variant,
    size,
    theme,
    value,
    unit = '₽',
    preText,
    disableUnit = false,
    valueStyles = emptyCSS,
    preTextStyles = emptyCSS,
    unitStyles = emptyCSS,
    ...props
}: IPriceProps<V, S>) => {
    const state = useMemo<PriceStateFullType<V, S>>(
        () => ({ typography, isCrossed, variant, size }),
        [typography, isCrossed, size, variant]
    );

    const getCSS = useThemeCSSPart(theme!, state);

    const containerCSS = getCSS('container');

    const preTextCSS = useMergeCSS(getCSS('preText'), preTextStyles);
    const valueCSS = useMergeCSS(getCSS('value'), valueStyles);
    const unitCSS = useMergeCSS(getCSS('unit'), unitStyles);

    return (
        <div css={containerCSS} {...props}>
            {preText && <span css={preTextCSS}>{preText} </span>}
            <span css={valueCSS}>{formatPrice(value, 'ru')}</span>
            {!disableUnit && <span css={unitCSS}> {unit}</span>}
        </div>
    );
};

const createPriceWithTheme = <V extends EnumLike, S extends EnumLike>(
    defaultTheme: IPriceTheme<V, S>,
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
