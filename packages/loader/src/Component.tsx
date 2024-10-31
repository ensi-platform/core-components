import { type FC, useMemo } from 'react';
import { type EnumLike, useThemeCSSPart } from '@greensight/core-components-common';
import type { ILoaderProps, LoaderStateFullType, LoaderThemeType } from './types';
import { LOADER_THEMES } from './themes';
import { emptyCSS, LoaderSizes, LoaderVariants, useMergeCSS } from './scripts';

export const BaseLoader = <V extends EnumLike, S extends EnumLike>({
    message = '',
    wrapperStyles = emptyCSS,
    containerStyles = emptyCSS,
    spinnerStyles = emptyCSS,
    messageStyles = emptyCSS,
    theme,
    variant,
    size,
}: ILoaderProps<V, S>) => {
    const state = useMemo<LoaderStateFullType<V, S>>(() => ({ message, variant, size }), [message, size, variant]);

    const getCSS = useThemeCSSPart(theme!, state);

    const wrapperCSS = useMergeCSS(getCSS('wrapper'), wrapperStyles);
    const containerCSS = useMergeCSS(getCSS('container'), containerStyles);
    const spinnerCSS = useMergeCSS(getCSS('spinner'), spinnerStyles);
    const messageCSS = useMergeCSS(getCSS('message'), messageStyles);

    return (
        <div css={wrapperCSS}>
            <div css={containerCSS}>
                <div css={spinnerCSS} />
                {message && <h4 css={messageCSS}>{message}</h4>}
            </div>
        </div>
    );
};

const createLoaderWithTheme = <V extends EnumLike, S extends EnumLike>(
    defaultTheme: LoaderThemeType<V, S>,
    defaultVariant: V | keyof V,
    defaultSize: S | keyof S
) => {
    const ThemedLoader = ({
        theme = defaultTheme,
        variant = defaultVariant,
        size = defaultSize,
        ...props
    }: ILoaderProps<V, S>) => <BaseLoader theme={theme} variant={variant} size={size} {...props} />;

    return ThemedLoader as FC<ILoaderProps<V, S>>;
};

const Loader = createLoaderWithTheme<typeof LoaderVariants, typeof LoaderSizes>(
    LOADER_THEMES.basic,
    LoaderVariants.primary,
    LoaderSizes.md
);

export default Loader;
