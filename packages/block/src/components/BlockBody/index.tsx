import { scale } from '@ensi-platform/core-components-common';

import type { FC, ReactNode } from 'react';

import type { IBlockBodyProps } from './types';

export interface BlockBodyProps {
    className?: string;
    children?: ReactNode | ReactNode[];
}

export const BlockBody: FC<IBlockBodyProps> = props => (
    <div
        css={{
            padding: `${scale(2)}px ${scale(3)}px`,
        }}
        {...props}
    />
);
