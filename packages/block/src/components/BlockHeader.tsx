import { defaultTheme, scale } from '@ensi-platform/core-components-common';

import type { ReactNode } from 'react';

export interface BlockHeaderProps {
    className?: string;
    children?: ReactNode;
    borderColor?: string;
}

const BlockHeader = ({ className, children, borderColor = defaultTheme.colors.grey400 }: BlockHeaderProps) => (
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
        className={className}
    >
        {children}
    </div>
);

export default BlockHeader;
