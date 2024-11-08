import { defaultTheme, scale } from '@ensi-platform/core-components-common';

import { CheckboxTheme } from './types';

const outerSize = scale(5, true);

const { colors, typography } = defaultTheme;

const basicTheme: CheckboxTheme = {
    container: ({ align }) => ({
        display: 'inline-flex',
        alignItems: align === 'center' ? 'center' : 'flex-start',
        cursor: 'pointer',
        position: 'relative',
    }),
    icon: {
        position: 'absolute',
        top: outerSize / 2 - 1,
        left: outerSize / 2,
        zIndex: 2,
        fill: colors.white,
        transform: 'translate(-50%, -50%) scale(0)',
        willChange: 'transform',
        transition: 'transform ease 300ms',
        'input:checked + span > &': {
            transform: 'translate(-50%, -50%) scale(1)',
        },
        'input:disabled + span > &': {
            fill: colors.grey600,
        },
    },
    box: ({ disabled, error, focused, checked }) => ({
        width: outerSize,
        height: outerSize,
        border: `1px solid ${error ? colors.danger : colors.grey600}`,
        borderRadius: '2px',
        ...(focused && {
            border: `1px solid ${colors.primary}`,
        }),
        ...(checked && {
            background: colors?.primary,
        }),
        '.focus-visible + & ': {
            outline: `2px solid ${colors.primary}`,
            outlineOffset: 2,
        },
        ...(disabled
            ? {
                  borderColor: colors?.grey400,
                  background: colors?.grey200,
              }
            : {
                  ':hover': {
                      borderColor: colors.primary,
                  },
              }),
    }),
    content: ({ disabled }) => ({
        minHeight: 19,
        display: 'block',
        marginLeft: scale(3, true),
        ...typography('bodySm'),
        textAlign: 'left',
        color: colors.black,
        transition: 'color ease 300ms',
        ...(disabled && {
            color: colors.grey600,
            cursor: 'not-allowed',
        }),
    }),
    indeterminateLine: {
        position: 'absolute',
        width: 10,
        height: 2,
        background: colors.grey400,
    },

    hint: {
        color: colors.grey400,
    },
    error: {
        color: colors.danger,
    },
    addons: {},
};

export const checkboxThemes = {
    basic: basicTheme as CheckboxTheme,
};

export const setBasicCheckboxTheme = (popupTheme: CheckboxTheme) => {
    checkboxThemes.basic = popupTheme;
};
