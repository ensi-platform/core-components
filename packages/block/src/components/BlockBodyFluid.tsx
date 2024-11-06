import { ReactNode } from 'react';

import { scale, defaultTokens, useMedia } from '@ensi-platform/core-components-common';

export interface BlockBodyFluidProps {
    className?: string;
    children?: ReactNode;
}

/**
 * Через отрицательный margin заполняет содержимое блока во всю ширину.
 * Работает только на мобилках для таблиц.
 */
const BlockBodyFluid = ({ className, children }: BlockBodyFluidProps) => {
    const { md } = useMedia(defaultTokens);
    return (
        <div
            className={className}
            css={{
                [md]: {
                    marginLeft: -scale(2),
                    marginRight: -scale(2),
                },
            }}
        >
            {children}
        </div>
    );
};

export default BlockBodyFluid;
