import { type FC, useMemo } from 'react';
import { type EnumLike, useThemeCSS } from '@greensight/core-components-common/index';
import { type ILoaderProps, type LoaderStateFullType, type ILoaderTheme } from './types';
import { LOADER_THEMES } from './themes';
import { LoaderSizes, LoaderVariants } from './scripts';

export const BaseLoader = <V extends EnumLike, S extends EnumLike>({
    message = '',
    theme,
    variant,
    size,
}: ILoaderProps<V, S>) => {
    const state = useMemo<LoaderStateFullType<V, S>>(() => ({ message, variant, size }), [message, size, variant]);

    const {
        spinner: spinnerCSS,
        message: messageCSS,
        wrapper: wrapperCSS,
        container: containerCSS,
    } = useThemeCSS(theme!, state);

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
    defaultTheme: ILoaderTheme<V, S>,
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
