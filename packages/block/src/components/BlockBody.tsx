import { scale } from '@ensi-platform/core-components-common';

import { type ReactNode } from 'react';

export interface BlockBodyProps {
    className?: string;
    children?: ReactNode | ReactNode[];
}

const BlockBody = ({ className, children }: BlockBodyProps) => (
    <div
        className={className}
        css={{
            padding: `${scale(2)}px ${scale(3)}px`,
        }}
    >
        {children}
    </div>
);

export default BlockBody;
