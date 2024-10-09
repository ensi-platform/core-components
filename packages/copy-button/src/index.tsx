import { HTMLAttributes, useEffect, useState } from 'react';
import { IconSmallCheck, IconSmallCopy, scale, Link, useLinkCSS } from '@greensight/core-components-common';

export interface CopyButtonProps extends Omit<HTMLAttributes<HTMLButtonElement>, 'children'> {
    children: string;
    timeout?: number;
    linkStyle?: Link;
}

export const CopyButton = ({ children, timeout = 1000, linkStyle, ...props }: CopyButtonProps) => {
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
