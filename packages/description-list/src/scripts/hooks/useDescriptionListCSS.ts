import { defaultTheme, scale } from '@ensi-platform/core-components-common';

import type { CSSObject } from '@emotion/react';

const { colors } = defaultTheme;

const nameStyles: CSSObject = { color: colors.grey800 };

const dashedItemStyles: CSSObject = {
    position: 'relative',
    display: 'block',
    flexGrow: 1,
    minWidth: scale(2),
    '::before': {
        content: '""',
        position: 'absolute',
        top: 14,
        height: 1,
        width: '100%',
        borderBottom: `1px dotted ${colors.grey500}`,
    },
};
const valueStyles: CSSObject = { textAlign: 'right', flexShrink: 1, wordBreak: 'break-all' };
const ulStyles: CSSObject = { li: { display: 'flex', marginBottom: scale(1) } };

export const useDescriptionListCSS = () => ({ ulStyles, nameStyles, dashedItemStyles, valueStyles });
