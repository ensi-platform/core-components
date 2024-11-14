import { defaultTheme, typography } from '@ensi-platform/core-components-common';

import type { PriceSizes, PriceVariants } from '../scripts';
import type { PriceThemeType } from '../types';

const { colors } = defaultTheme;

export const basicTheme: PriceThemeType<typeof PriceVariants, typeof PriceSizes> = {
    container: state => ({
        display: 'inline-block',
        position: 'relative',
        whiteSpace: 'nowrap',
        ...typography(state.typography),

        ...(state.isCrossed && {
            '&::before': {
                content: '""',
                position: 'absolute',
                clipPath: 'polygon(0% 97%, 97% 0%, 100% 3%, 3% 100%)',
                backgroundColor: colors.danger,
                height: '100%',
                width: '100%',
            },
        }),
    }),
    unit: ({ unitTypography }) => ({
        ...(unitTypography && typeof unitTypography === 'string' ? typography(unitTypography) : unitTypography),
    }),
};
