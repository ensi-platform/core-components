import { defaultTheme, scale } from '@ensi-platform/core-components-common';

import type { CSSObject } from '@emotion/react';

import { type RadioSizesEnum, type RadioVariantsEnum } from '../scripts';
import type { RadioThemeType } from '../types';

const { colors } = defaultTheme;

const borderWidth = 1.5;
const size = scale(5, true);

const radioSize = size / 2;
const padding = (size - radioSize) / 2 - borderWidth;

const commonRadioCSS: CSSObject = {
    width: size,
    height: size,
    borderRadius: '50%',
};

export const basicTheme: RadioThemeType<typeof RadioVariantsEnum, typeof RadioSizesEnum> = {
    container: () => ({
        display: 'inline-flex',
        flexDirection: 'column',
        rowGap: scale(1, true),
    }),

    label: ({ checked, disabled }) => ({
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        columnGap: scale(1),
        color: disabled ? colors.grey600 : colors.grey900,
        cursor: disabled ? 'not-allowed' : 'pointer',

        ...(checked &&
            disabled && {
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    backgroundColor: colors.grey200,
                    ...commonRadioCSS,
                },
            }),
    }),

    input: ({ error, disabled }) => ({
        position: 'absolute',
        opacity: 0,
        zIndex: -1,

        ...(!error &&
            !disabled && {
                '&:focus + span, &:hover + span': {
                    borderColor: colors.primary,
                },
            }),
    }),

    radio: ({ error, checked, disabled }) => ({
        position: 'relative',
        backgroundClip: disabled && !checked ? 'border-box' : 'content-box',
        border: `${borderWidth}px solid ${disabled ? colors.grey400 : colors.grey600}`,
        padding: disabled && !checked ? 0 : padding,
        ...commonRadioCSS,

        ...(!disabled &&
            error && {
                borderColor: colors.danger,
            }),

        ...(checked && {
            backgroundColor: colors.primary,
        }),

        ...(disabled && {
            backgroundColor: colors.grey200,
        }),

        ...(checked &&
            disabled && {
                backgroundColor: colors.grey600,
            }),
    }),
};
