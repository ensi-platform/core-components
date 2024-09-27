import { BaseThemeState, StyleDefinition, ValueOrFunction, useThemeCSSPart } from '@greensight/core-components-common';
import { TagsProps } from './component';

const TagsVariant = {
    primary: 'primary',
} as const;

const TagsSize = {
    md: 'md',
} as const;

export type TagsThemeState = BaseThemeState<typeof TagsVariant, typeof TagsSize> & Pick<TagsProps, 'wrap'>;

export type TagsTheme = ValueOrFunction<
    {
        /**
         * Wrapper div styles
         */
        wrapper: StyleDefinition<TagsThemeState>;
        /**
         * Tag styles
         */
        tag: StyleDefinition<TagsThemeState & { onClick?: boolean; disabled?: boolean }>;
        /**
         * Tag close button styles
         */
        tagCloser: StyleDefinition<TagsThemeState>;
    },
    [TagsThemeState]
>;

export const useThemePart = () => useThemeCSSPart<TagsThemeState, TagsTheme>(...([] as never as [any, any]));
