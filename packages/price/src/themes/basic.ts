import { defaultTheme, typography } from '@greensight/core-components-common';
import { PriceSizes, PriceVariants } from '../scripts';
import { type IPriceTheme } from '../types';

const { colors } = defaultTheme;

export const basicTheme: IPriceTheme<typeof PriceVariants, typeof PriceSizes> = {
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
};
