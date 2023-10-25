import { CSSObject } from '@emotion/react';

export const useLineClampCSS = (lines: number) => {
    const lineClampStyles: CSSObject = {
        display: '-webkit-box',
        textOverflow: 'ellipsis',
        ' -webkit-box-orient': 'vertical',
        ' -webkit-line-clamp': lines,
        overflow: 'hidden',
        wordBreak: 'break-word',
    };

    return { lineClampStyles };
};
