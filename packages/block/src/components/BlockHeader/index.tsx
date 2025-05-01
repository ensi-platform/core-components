import { defaultTheme, scale } from '@ensi-platform/core-components-common';

import type { FC } from 'react';

import type { IBlockHeaderProps } from './types';

export const BlockHeader: FC<IBlockHeaderProps> = ({ borderColor = defaultTheme.colors.grey400, ...props }) => (
    <div
        css={{
            borderBottom: `1px solid ${borderColor}`,
            padding: `${scale(2)}px ${scale(3)}px`,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            minHeight: scale(8),
            flexWrap: 'wrap',
        }}
        {...props}
    />
);
