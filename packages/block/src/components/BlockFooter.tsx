import { ReactNode } from 'react';
import { scale, defaultTheme } from '@ensi-platform/core-components-common';

export interface BlockFooterProps {
    className?: string;
    children?: ReactNode;
    borderColor?: string;
}

const BlockFooter = ({ className, children, borderColor = defaultTheme.colors.grey400 }: BlockFooterProps) => (
    <div
        css={{
            borderTop: `1px solid ${borderColor}`,
            padding: `${scale(2)}px ${scale(3)}px`,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            minHeight: scale(8),
        }}
        className={className}
    >
        {children}
    </div>
);

export default BlockFooter;
