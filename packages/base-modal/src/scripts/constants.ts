import type { CSSObject } from '@emotion/react';

export const dialogDivCSS: CSSObject = {
    position: 'fixed',
    inset: 0,
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    outline: 0,
};

export const componentDivCSS: CSSObject = {
    position: 'relative',
    margin: 'auto',
    flexShrink: 0,
};

export const contentDivCSS: CSSObject = {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
};
