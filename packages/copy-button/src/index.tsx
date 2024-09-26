import { FC, useEffect, useState } from 'react';
import { IconSmallCheck, IconSmallCopy, scale, useLinkCSS } from '@greensight/core-components-common';
import type { ICopyButtonProps } from './types';

export * from './types';

/**
 * A button for copying text content
 */
export const CopyButton: FC<ICopyButtonProps> = ({ children, timeout = 1000, linkStyle, ...props }) => {
    const linkStyles = useLinkCSS(linkStyle);
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (isSuccess) setIsSuccess(false);
        }, timeout);
        return () => clearTimeout(timer);
    }, [isSuccess, timeout]);

    return (
        <button
            type="button"
            css={linkStyles}
            {...props}
            aria-label="Копировать"
            title="Копировать"
            onClick={() => {
                navigator?.clipboard.writeText(children).then(() => setIsSuccess(true));
            }}
        >
            {children}
            {isSuccess ? (
                <IconSmallCheck css={{ marginLeft: scale(1, true) }} />
            ) : (
                <IconSmallCopy css={{ marginLeft: scale(1, true) }} />
            )}
        </button>
    );
};
