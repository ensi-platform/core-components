import { HTMLProps, ReactNode } from 'react';

import { BaseThemeState, StyleDefinition, ValueOrFunction, useThemeCSSPart } from '@greensight/core-components-common';

export interface TagsState {
    /**
     * Разрешить перенос на новую строку
     * @default true
     */
    wrap?: boolean;
}

const TagsVariant = {
    primary: 'primary',
} as const;

const TagsSize = {
    md: 'md',
} as const;

export type TagsThemeState = BaseThemeState<typeof TagsVariant, typeof TagsSize> & TagsState;

export type TagsTheme = ValueOrFunction<
    {
        gradientWrapper: StyleDefinition<TagsThemeState>;
        wrapper: StyleDefinition<TagsThemeState>;
        tag: StyleDefinition<TagsThemeState & { onClick?: boolean; disabled?: boolean }>;
        tagCloser: StyleDefinition<TagsThemeState>;
    },
    [TagsThemeState]
>;

const useFoo = () => useThemeCSSPart<TagsThemeState, TagsTheme>(...([] as never as [any, any]));

export interface TagProps extends HTMLProps<Omit<HTMLButtonElement, 'type'>> {
    CloseIcon?: (props: { className?: string }) => ReactNode;
    onDelete?: () => void;
    getCSS?: ReturnType<typeof useFoo>;
}

export interface TagsProps extends TagsState {
    /**
     * Wrapper class
     */
    className?: string;
    disabled?: boolean;
    children: ReactNode[];
    onDelete: (index: number) => void;

    CloseIcon?: TagProps['CloseIcon'];

    theme?: TagsTheme;
}
