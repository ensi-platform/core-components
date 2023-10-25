import { defaultTheme, scale } from '@greensight/core-components-common';

import { AccordionTheme } from './types';

const { colors, typography } = defaultTheme;

const basicTheme: AccordionTheme = {
    item: {
        ':not(:first-of-type)': {
            borderTop: `1px solid ${colors.grey400}`,
        },
    },
    button: {
        ...typography('bodyMdBold'),
        positin: 'relative',
        color: colors.primary,
        backgroundColor: colors.grey100,
        padding: `${scale(1)}px ${scale(5)}px ${scale(1)}px ${scale(3, true)}px`,
        cursor: 'pointer',
        transition: 'color ease 200ms, background-color ease 200ms, box-shadow ease 200ms',
        '.js-focus-visible &.focus-visible:focus': {
            zIndex: 1,
            outline: `2px solid ${colors.warning}`,
        },
    },
    buttonIcon: {
        position: 'absolute',
        top: '50%',
        right: scale(3, true),
        transform: 'translateY(-50%)',
        fill: colors.grey800,
        transition: 'transform ease 300ms, fill ease 300ms',
        '[aria-expanded="true"] &': {
            transform: 'translateY(-50%) rotate(-180deg)',
        },
    },
    container: {
        width: '100%',
        border: `1px solid ${colors.grey400}`,
    },
    panel: {
        padding: `${scale(1)}px ${scale(3, true)}px`,
        backgroundColor: colors.white,
        '.exit-active &[hidden]': {
            display: 'block',
        },
    },
};

export const accordionThemes = {
    basic: basicTheme as AccordionTheme,
};

export const setBasicAccordionTheme = (popupTheme: AccordionTheme) => {
    accordionThemes.basic = popupTheme;
};
