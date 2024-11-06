import { type FC, useMemo } from 'react';
import { type EnumLike, useThemeCSSPart } from '@ensi-platform/core-components-common';
import type { ILoaderProps, LoaderStateFullType, LoaderThemeType } from './types';
import { LOADER_THEMES } from './themes';
import { emptyCSS, LoaderSizes, LoaderVariants, useMergeCSS } from './scripts';

export const BaseLoader = <V extends EnumLike, S extends EnumLike>({
    message = '',
    wrapperCSS: wrapperCSSProp = emptyCSS,
    containerCSS: containerCSSProp = emptyCSS,
    spinnerCSS: spinnerCSSProp = emptyCSS,
    messageCSS: messageCSSProp = emptyCSS,
    className,
    theme,
    variant,
    size,
}: ILoaderProps<V, S>) => {
    const state = useMemo<LoaderStateFullType<V, S>>(() => ({ message, variant, size }), [message, size, variant]);

    const getCSS = useThemeCSSPart(theme!, state);

    const wrapperCSS = useMergeCSS(getCSS('wrapper'), wrapperCSSProp);
    const containerCSS = useMergeCSS(getCSS('container'), containerCSSProp);
    const spinnerCSS = useMergeCSS(getCSS('spinner'), spinnerCSSProp);
    const messageCSS = useMergeCSS(getCSS('message'), messageCSSProp);

    return (
        <div css={wrapperCSS} className={className}>
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
