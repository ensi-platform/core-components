import { CSSObject } from '@emotion/react';
import { scale, typography } from '../gds';
import { defaultTheme } from '../../index';

export const useListCSS = () => {
    const { colors } = defaultTheme;

    const dlBaseStyles: CSSObject = { display: 'grid', gridTemplateColumns: "'1fr 1fr'" };
    const dtBaseStyles: CSSObject = {
        padding: `${scale(1)}px ${scale(1)}px ${scale(1)}px 0 `,
        borderBottom: `1px solid ${colors?.grey200}`,
        ...typography('bodySmBold'),
        ':last-of-type': { border: 'none' },
    };
    const ddBaseStyles: CSSObject = {
        padding: `${scale(1)}px 0`,
        borderBottom: `1px solid ${colors?.grey200}`,
        ':last-of-type': { border: 'none' },
    };

    return { dlBaseStyles, dtBaseStyles, ddBaseStyles };
};
