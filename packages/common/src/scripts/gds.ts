import { CSSObject } from '@emotion/react';
import {
    Theme,
    createMediaQueries,
    createTheme,
    typography as gdsTypography,
    useTheme as useGDSTheme,
} from '@greensight/gds';
import { Button } from './themes/button';

export * from '@greensight/gds';
type ColorsType<TColorName extends string = string> = Record<TColorName, string>;

type TypographyType<TStyleName extends Exclude<string, symbol | number> = string> = {
    breakpoints: [number, number] | number[];
    styles: Record<TStyleName, Record<string, CSSObject | object>>;
};

type ShadowsType<TShadowName extends string = string> = Record<TShadowName, string>;

type PartialRecord<T extends string, TValue> = {
    [key in T]?: TValue;
};

type LayoutType<TSizeName extends string = string> = {
    cols: PartialRecord<TSizeName, number | string>;
    container: PartialRecord<TSizeName, number | string>;
    marginLeft: PartialRecord<TSizeName, number | string>;
    marginRight: PartialRecord<TSizeName, number | string>;
    breakpoints: Record<TSizeName, number>;
    gap: PartialRecord<TSizeName, number | string>;
    padding: PartialRecord<TSizeName, number | string>;
};

export interface TokensInterface<
    TColorName extends string = string,
    TStyleName extends string = string,
    TShadowName extends string = string,
    TSizeName extends string = string,
> {
    colors: ColorsType<TColorName>;
    typography: TypographyType<TStyleName>;
    shadows: ShadowsType<TShadowName>;
    layout: LayoutType<TSizeName>;
}

export interface GdsTheme extends Omit<Theme, 'colors'> {}

export type ExtractBreakpoint<T extends TokensInterface> = keyof T['layout']['breakpoints'];
export type ExtractColor<T extends TokensInterface> = keyof T['colors'];
export type ExtractTypography<T extends TokensInterface> = Exclude<keyof T['typography']['styles'], number | symbol>;

export type DefinedTheme<T extends TokensInterface> = {
    tokens: T;
    theme: GdsTheme;
    useTheme: () => GdsTheme;
    typography: (name: ExtractTypography<T>) => CSSObject;
    mediaQueries: Record<
        ExtractBreakpoint<T> extends string ? ExtractBreakpoint<T> : never,
        `@media (max-width: ${number}px)`
    > &
        Record<
            `${ExtractBreakpoint<T> extends string ? ExtractBreakpoint<T> : never}Min`,
            `@media (min-width: ${number}px)`
        >;
    colors: T['colors'];
    shadows: T['shadows'];
};

export const defineTheme = <T extends TokensInterface>(tokens: T, global: Theme['global']) => {
    const mediaQueries = createMediaQueries(tokens.layout.breakpoints);

    const settings: GdsTheme = {
        global,
        components: {
            Button,
        },
    };

    const theme = createTheme({
        tokens,
        settings,
    }) as GdsTheme;

    type TypographyParam = ExtractTypography<T>;

    const typography = (name: TypographyParam) => gdsTypography(name, theme) as CSSObject;
    const useTheme = () => useGDSTheme() as GdsTheme;

    return {
        tokens,
        theme,
        useTheme,
        typography,
        mediaQueries,
        colors: tokens.colors as T['colors'],
        shadows: tokens.shadows as T['shadows'],
    } as DefinedTheme<T>;
};
