import { defaultTheme, scale } from '@ensi-platform/core-components-common';

import type { FC } from 'react';

import type { IBlockFooterProps } from './types';

export const BlockFooter: FC<IBlockFooterProps> = ({ borderColor = defaultTheme.colors.grey400, ...props }) => (
    <div
        css={{
            borderTop: `1px solid ${borderColor}`,
            padding: `${scale(2)}px ${scale(3)}px`,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            minHeight: scale(8),
        }}
        {...props}
    />
);
