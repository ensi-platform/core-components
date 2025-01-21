import { defaultTheme, scale } from '@ensi-platform/core-components-common';

import type { CheckboxThemeType } from '../types';

const outerSize = scale(5, true);

const { colors, typography } = defaultTheme;

export const basicTheme: CheckboxThemeType = {
    container: () => ({
        position: 'relative',
    }),

    label: ({ align, disabled }) => ({
        display: 'inline-flex',
        alignItems: align === 'center' ? 'center' : 'flex-start',
        cursor: 'pointer',
        ...typography('bodySm'),
        color: colors.black,
        transition: 'color ease 300ms',

        ...(disabled && {
            color: colors.grey600,
            cursor: 'not-allowed',
        }),
    }),

    box: ({ disabled, error, focused, checked, indeterminate }) => ({
        position: 'relative',
        width: outerSize,
        height: outerSize,
        flexShrink: 0,
        border: `1px solid ${error ? colors.danger : colors.grey600}`,
        borderRadius: '2px',

        '.focus-visible + & ': {
            outline: `2px solid ${colors.primary}`,
            outlineOffset: 2,
        },

        '& + span': {
            marginLeft: scale(3, true),
        },

        ...(focused && {
            borderColor: colors.primary,
        }),

        ...((checked || indeterminate) && {
            background: colors?.primary,
            borderColor: colors.primary,
        }),

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

    icon: {
        position: 'absolute',
        top: outerSize / 2 - 1,
        left: outerSize / 2 - 1,
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

    indeterminateLine: {
        position: 'absolute',
        top: outerSize / 2 - 2,
        left: outerSize / 4 - 1,
        zIndex: 2,
        width: 10,
        height: 2,
        background: colors.white,
    },

    message: {
        display: 'block',
    },

    hint: {
        color: colors.grey400,
    },
};
