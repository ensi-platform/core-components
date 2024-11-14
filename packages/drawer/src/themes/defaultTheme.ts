import { defaultTheme, scale } from '@ensi-platform/core-components-common';

import type { DrawerTheme } from '../types';

const { colors, typography } = defaultTheme;

const basicTheme: DrawerTheme = {
    component: ctx => ({
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        top: 0,
        height: '100%',
        width: 336,
        flex: 1,
        overflow: 'auto',
        willChange: 'transform',
        backgroundColor: '#fff',
        ...(ctx.placement === 'left' && { left: 0, right: 'auto', alignSelf: 'flex-start' }),
        ...(ctx.placement === 'right' && { right: 0, left: 'auto', alignSelf: 'flex-end' }),
    }),

    content: { padding: scale(3), flexGrow: 1, flexShrink: 0 },
    footer: {
        padding: `${scale(2)}px ${scale(3)}px`,
        borderTop: `1px solid ${colors.grey200}`,
        background: colors.white,
        marginTop: 'auto',
        flexShrink: 0,
        display: 'flex',
        justifyContent: 'flex-end',
        gap: scale(1),
        position: 'sticky',
        left: 0,
        right: 0,
        bottom: 0,
    },

    header: ctx => ({
        padding: `${scale(2)}px ${scale(3)}px`,
        borderBottom: `1px solid ${colors?.grey200}`,
        background: colors?.white,
        marginTop: 'auto',
        ...(ctx.hasCloser && { paddingRight: scale(8) + scale(1, true) }),

        '>p': typography('h3'),
    }),

    closer: {
        position: 'absolute',
        top: 0,
        right: 0,
        width: scale(8) + scale(1, true),
        height: scale(6) + scale(1, true),
        transition: 'opacity ease-in 300ms',
        ':hover': { opacity: 0.8 },
    },
};

export const drawerThemes = {
    basic: basicTheme as DrawerTheme,
};

export const setBasicDrawerTheme = (theme: DrawerTheme) => {
    drawerThemes.basic = theme;
};
