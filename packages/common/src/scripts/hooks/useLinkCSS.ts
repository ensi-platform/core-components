import { type CSSObject } from '@emotion/react';

import { rgba } from 'emotion-rgba';

import { defaultTheme } from '../../index';

export type LinkColorType = 'blue' | 'black' | 'grey' | 'red';

const getLinkStyles = (
    color: string | undefined,
    hoverColor: string | undefined,
    disableColor: string | undefined
): CSSObject => ({
    fill: 'currentColor',
    color,
    svg: { verticalAlign: 'middle' },
    span: {
        borderBottomColor: color ? rgba(color, 0.2) : '#00000020',
        borderBottomWidth: 1,
        borderBottomStyle: 'solid',
    },
    ':hover': { color: hoverColor, span: { borderBottomColor: hoverColor ? rgba(hoverColor, 0.2) : '#00000020' } },
    ':disabled': {
        color: disableColor,
        cursor: 'not-allowed',
    },
});

export const useLinkCSS = (type: LinkColorType = 'blue') => {
    if (typeof window !== 'undefined') {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const { colors } = defaultTheme;

        if (type === 'black') {
            return getLinkStyles(colors?.grey900, colors?.link, colors?.grey600);
        }

        if (type === 'grey') {
            return getLinkStyles(colors?.grey800, colors?.grey900, colors?.grey600);
        }

        if (type === 'red') {
            return getLinkStyles(colors?.danger, colors?.danger, colors?.danger);
        }

        return getLinkStyles(colors?.link, colors?.primaryHover, colors?.grey600);
    }

    // Возвращаем базовые стили, если контекст недоступен
    return {
        fill: 'currentColor',
        color: 'black',
        svg: { verticalAlign: 'middle' },
        span: {
            borderBottomColor: rgba('black', 0.2),
            borderBottomWidth: 1,
            borderBottomStyle: 'solid',
        },
        ':hover': {
            color: 'gray',
            span: { borderBottomColor: rgba('gray', 0.2) },
        },
        ':disabled': {
            color: 'lightgray',
            cursor: 'not-allowed',
        },
    } as CSSObject;
};
