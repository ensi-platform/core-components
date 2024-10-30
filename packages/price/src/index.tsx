import { CSSObject } from '@emotion/react';
import { HTMLProps, useMemo } from 'react';

import {
    defaultTheme,
    DefinedTheme,
    ExtractBreakpoint,
    ExtractColor,
    ExtractTypography,
    formatPrice,
    scale,
    TokensInterface,
    useMedia,
} from '@ensi-platform/core-components-common';

export type AllowMedia<Breakpoint extends string | number | symbol, T> = T | Partial<Record<Breakpoint, T>>;

export interface PriceProps<Breakpoint extends string | number | symbol, TypographyParam>
    extends Omit<HTMLProps<HTMLDivElement>, 'type'> {
    isCrossed?: boolean;
    price: number | string;
    typography?: AllowMedia<Breakpoint, TypographyParam>;
    pretext?: string;
    unit?: string;
}

export const definePrice = <TTokens extends TokensInterface>(
    theme: DefinedTheme<TTokens>,
    defaultTypography: ExtractTypography<TTokens>,
    crossedColor: ExtractColor<TTokens>
) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const mediaQueries = useMedia(theme.tokens);

    return ({
        isCrossed,
        price,
        typography: typographyProp = defaultTypography,
        unit = '₽',
        pretext,
        ...props
    }: PriceProps<ExtractBreakpoint<TTokens>, ExtractTypography<TTokens>>) => {
        const typographies = useMemo<CSSObject>(() => {
            if (typeof typographyProp === 'string') {
                return { ...theme.typography(typographyProp) };
            }

            return Object.entries(typographyProp).reduce<Record<any, any>>((res, [key, name]) => {
                const media = key as keyof typeof mediaQueries;
                res[mediaQueries[media]] = theme.typography(name!);
                return res;
            }, {}) as CSSObject;
        }, [typographyProp]);

        const styles = useMemo<CSSObject>(
            () => ({
                position: 'relative',
                whiteSpace: 'nowrap',
                ...typographies,
                ...(isCrossed && {
                    width: 'fit-content',
                    '&:after': {
                        position: 'absolute',
                        left: 0,
                        top: '50%',
                        content: "''",
                        display: 'block',
                        backgroundColor: theme.colors[crossedColor],
                        height: '0.077em',
                        width: '100%',
                        transform: 'rotate(-16deg)',
                    },
                }),
            }),
            [isCrossed, typographies]
        );

        if (typeof price === 'string') {
            return (
                <span css={styles} {...props}>
                    {price}
                </span>
            );
        }

        return (
            <div css={styles} {...props}>
                {pretext && <span css={{ marginRight: scale(1, true) }}>{pretext}</span>}
                {formatPrice(price, 'ru')}
                <span css={{ marginLeft: 2 }}>{unit}</span>
            </div>
        );
    };
};

export const Price = definePrice(defaultTheme, 'bodyMdBold', 'danger');
