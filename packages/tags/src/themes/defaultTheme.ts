import { scale, defaultTheme } from '@greensight/core-components-common';
import { TagsTheme } from '../types';

const { colors, typography } = defaultTheme;

const basicTheme: TagsTheme = {
    gradientWrapper: ctx => ({
        ...(ctx.wrap && {
            ':after': {
                background: 'linear-gradient(90deg, transparent 20%, rgb(247 249 251) 90%)',
                content: '""',
                width: 30,
                height: '100%',
                position: 'absolute',
                right: 0,
                top: 0,
                bottom: 0,
            },
        }),
    }),
    wrapper: ctx => ({
        display: 'flex',
        flexWrap: ctx.wrap ? 'wrap' : 'nowrap',
        flexDirection: 'row',
        gap: `${scale(1)}px ${scale(1, true)}px`,
    }),
    tag: ctx => ({
        cursor: ctx.onClick ? 'pointer' : 'default',
        padding: `2px ${scale(1)}px`,
        overflow: 'hidden',
        minHeight: scale(3),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: colors.white,
        border: `1px solid ${colors.grey400}`,
        color: colors.black,
        ...(ctx.disabled && {
            opacity: 0.5,
            background: colors.grey200,
        }),
        ':hover': {
            background: colors.lightBlue,
        },
        ...typography('bodySm'),
    }),
    tagCloser: {
        cursor: 'pointer',
        display: 'flex',
        flexShrink: 0,
        flexGrow: 1,
        ':hover': { opacity: 0.5 },
        svg: {
            fill: 'currentColor',
            width: scale(2),
            height: scale(2),
            marginLeft: scale(1, true),
        },
    },
};

export const tagsThemes = {
    basic: basicTheme as TagsTheme,
};

export const setBasicTagsTheme = (theme: TagsTheme) => {
    tagsThemes.basic = theme;
};
