import { defaultTokens, scale, useMedia } from '@ensi-platform/core-components-common';

import { type FC } from 'react';

import type { IBlockMobileFluidProps } from './types';

/**
 * Using negative margin fills the block content to the full width.
 * Works only on mobile for tables.
 */
export const BlockMobileFluid: FC<IBlockMobileFluidProps> = props => {
    const { md } = useMedia(defaultTokens);
    return (
        <div
            css={{
                [md]: {
                    marginLeft: -scale(2),
                    marginRight: -scale(2),
                },
            }}
            {...props}
        />
    );
};
