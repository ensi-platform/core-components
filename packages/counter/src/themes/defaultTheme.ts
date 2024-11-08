import { type OptionizedCSS, defaultTheme, extractCSSOption, scale } from '@ensi-platform/core-components-common';

import { type CounterSize, type CounterTheme, type CounterThemeState } from '../types';

const { colors, typography } = defaultTheme;

const inputSizes: OptionizedCSS<typeof CounterSize> = {
    md: {
        height: scale(4),
        width: scale(6),
        padding: `0 ${scale(1)}px`,
    },
    lg: {
        height: scale(5),
        width: scale(8),
        padding: `0 ${scale(1)}px`,
    },
};

const getButtonCSS = (ctx: CounterThemeState, isIncr: boolean) => {
    const buttonSizes: OptionizedCSS<typeof CounterSize> = {
        md: {
            height: scale(4),
            ...(ctx.rounded &&
                ctx.view === 'horizontal' && {
                    [isIncr ? 'borderTopRightRadius' : 'borderTopLeftRadius']: scale(1),
                    [isIncr ? 'borderBottomRightRadius' : 'borderBottomLeftRadius']: scale(1),
                }),

            ...(ctx.rounded &&
                ctx.view === 'vertical' && {
                    [isIncr ? 'borderTopRightRadius' : 'borderBottomRightRadius']: scale(1),
                }),
            svg: {
                width: scale(5, true),
                height: scale(5, true),
            },
        },
        lg: {
            height: scale(5),
            svg: {
                width: scale(3),
                height: scale(3),
            },
        },
    };

    return {
        ...extractCSSOption(buttonSizes, ctx.size!),
        width: '100%',
        color: colors.grey900,
        border: `1px solid ${colors.grey400}`,
        outline: 'none',
        ':hover:not(:disabled)': { backgroundColor: colors.grey200 },
        ':disabled': { color: colors.grey200, cursor: 'not-allowed' },
        '&.focus-visible': { outline: `2px solid ${colors.primary}`, outlineOffset: -2 },
    };
};

const basicTheme: CounterTheme = {
    icon: {
        verticalAlign: 'middle',
        fill: 'currentColor',
        transition: `fill ease 300ms`,
    },
    layout: ctx => {
        const sized: OptionizedCSS<typeof CounterSize> = {
            md: {
                gridTemplateColumns:
                    ctx.view === 'horizontal'
                        ? `${scale(4)}px ${scale(6)}px ${scale(4)}px`
                        : `${scale(7)}px ${scale(4)}px`,
            },
            lg: {},
        };

        return extractCSSOption(sized, ctx.size!);
    },
    input: ({ view, size, rounded }) => ({
        ...extractCSSOption(inputSizes, size)!,
        border: `1px solid ${colors.grey400}`,
        width: '100%',
        borderLeft: 'none',
        borderRight: 'none',
        ...typography('bodySm'),
        textAlign: 'center',
        ...(view === 'vertical' && { height: '100%', borderLeft: `1px solid ${colors.grey400}` }),

        ...(view === 'vertical' &&
            rounded && {
                borderTopLeftRadius: scale(1),
                borderBottomLeftRadius: scale(1),
            }),
        '&.focus-visible': { outline: `2px solid ${colors.primary}`, outlineOffset: -2 },
    }),
    decrButton: ctx => ({
        ...getButtonCSS(ctx, false),
        ...(ctx.view === 'vertical' && { borderTop: 'none' }),
    }),
    incrButton: ctx => getButtonCSS(ctx, true),
};

export const counterThemes = {
    basic: basicTheme as CounterTheme,
};

export const setBasicCounterTheme = (theme: CounterTheme) => {
    counterThemes.basic = theme;
};
