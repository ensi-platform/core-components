import { defaultTheme, scale } from '@ensi-platform/core-components-common';

import { CSSObject } from '@emotion/react';

import deepmerge from 'deepmerge';

import { CalendarTheme } from '../types';

const mergeStyles = (styles: (CSSObject | false)[]) => {
    const nonNullStyles = styles.filter(Boolean) as CSSObject[];

    return deepmerge.all(nonNullStyles) as CSSObject;
};

const { colors, typography, shadows } = defaultTheme;

const daySize = scale(9, true);

const basicTheme: CalendarTheme = {
    keyframes: ({ direction }) => ({
        transition: 'opacity 300ms, transform 300ms',
        '&.fade-enter': {
            opacity: 0,
            position: 'absolute',
            left: 0,
            ...(direction && {
                transform: `translateX(${direction === 'right' ? '-' : ''}${daySize}px)`,
            }),
        },
        '&.fade-enter-active': {
            opacity: 1,
            transition: 'opacity 300ms, transform 300ms',
            ...(direction && {
                transform: 'translateX(0%)',
            }),
        },
        '&.fade-exit': {
            pointerEvents: 'none',
            opacity: 1,
            ...(direction && {
                transform: 'translateX(0%)',
            }),
        },
        '&.fade-exit-active': {
            opacity: 0,
            ...(direction && {
                transform: `translateX(${direction === 'left' ? '-' : ''}${daySize}px)`,
            }),
        },
    }),
    container: ({ weeksCount }) => ({
        width: 268,
        height: 262 + (weeksCount === 6 ? daySize : 0),
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        outline: 'none',
        border: `1px solid ${colors.grey300}`,
        borderRadius: '0%',
        boxShadow: shadows.box,
        background: colors.white,
    }),
    wrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        boxSizing: 'border-box',
        flexGrow: 1,
        overflow: 'hidden',
        padding: `${scale(1)}px ${scale(1)}px`,
    },
    daysTableTh: {
        ...typography('bodySm'),
        color: colors.grey600,
        backgroundColor: colors.white,
        width: daySize,
        height: daySize,
        padding: 0,
    },
    daysTableButton: ({
        highlighted = false,
        selected = false,
        range = false,
        rangeStart = false,
        transitLeft = false,
        transitRight = false,
        today = false,
        firstDay = false,
        lastDay = false,
        event = false,
        disabled = false,
    }) =>
        mergeStyles([
            {
                background: 'none!important',
                color: `${colors.black}!important`,
                position: 'relative',
                width: daySize,
                height: daySize,
                padding: `${scale(1, true)}px ${scale(1)}px`,
                display: 'grid',
                placeItems: 'center',
                textAlign: 'center',
                boxSizing: 'border-box',
                borderRadius: '0!important',
                '&:focus': { zIndex: 1 },
            },
            event && {
                '&::before': {
                    content: "''",
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    transform: 'translate(-50%, 50%)',
                    width: '6px',
                    height: '6px',
                    borderRadius: `50%`,
                    background: colors.danger,
                },
            },
            today && {
                ...typography('bodySmBold'),
                'span::after': {
                    content: "''",
                    border: `1px solid ${colors.white}`,
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    width: '100%',
                    height: '100%',
                    borderRadius: `0%`,
                    boxSizing: 'border-box',
                },
            },
            highlighted && {
                color: `${colors.black} !important`,
                background: `${colors.grey300} !important`,
            },
            disabled && {
                pointerEvents: 'none',
                color: `${colors.grey600} !important`,
                background: `${colors.white} !important`,
                cursor: 'default',
            },
            range && {
                color: colors.dark,
                background: colors.grey300,
                borderRadius: 0,
            },
            selected && {
                color: colors.white,
                background: `${colors.primary} !important`,
                cursor: 'default',
            },
            rangeStart && { cursor: 'pointer' },
            (firstDay || lastDay) && {
                '&::after': {
                    transition: 'opacity 0.2s ease',
                    content: "''",
                    position: 'absolute',
                    display: 'block',
                    width: '100%',
                    height: '100%',
                    opacity: 0,
                    pointerEvents: 'none',
                    ...(firstDay && {
                        right: '100%',
                        background: `linear-gradient(270deg, ${colors.grey300} 0%, ${colors.white} 100%)`,
                    }),
                    ...(lastDay && {
                        left: '100%',
                        background: `linear-gradient(
                            270deg,
                            ${colors.white} 0%,
                            ${colors.grey300} 100%
                        )`,
                    }),
                },
            },
            (transitLeft || transitRight) && {
                '&::after': { opacity: 1 },
            },
            transitLeft && {
                'td:first-of-type &': {
                    background: `linear-gradient(270deg, ${colors.grey300} 0%, ${colors.white} 100%)`,
                    '&::after': { display: 'none' },
                },
            },
            transitRight && {
                'td:last-of-type &': {
                    background: `linear-gradient(270deg, ${colors.white} 0%, ${colors.grey300} 100%)`,
                    '&::after': { display: 'none' },
                },
            },
        ]),
    daysTableRoot: {
        borderCollapse: 'collapse',
        borderSpacing: 0,
        position: 'relative',
    },
    selectButton: ({ buttonVariant }) => ({
        borderRadius: '0!important',
        background: 'none!important',
        color: `${colors.black} !important`,
        display: 'grid',
        placeItems: 'center',
        height: daySize,
        padding: `${scale(1, true)}px ${scale(1)}px`,
        ':hover': {
            color: `${colors.black} !important`,
            background: `${colors.grey300} !important`,
        },
        '&:disabled': {
            color: `${colors.grey600} !important`,
            background: `${colors.white} !important`,
            boxShadow: 'none!important',
        },
        ...(buttonVariant === 'selected' && {
            color: `${colors.white}!important`,
            background: `${colors.primary}!important`,
        }),
        ...(buttonVariant === 'outlined' && {
            fontWeight: 'bolder!important',
        }),
    }),
    yearsTable: {},
};

export const сalendarThemes = {
    basic: basicTheme as CalendarTheme,
};

export const setBasicCalendarTheme = (popupTheme: CalendarTheme) => {
    сalendarThemes.basic = popupTheme;
};
