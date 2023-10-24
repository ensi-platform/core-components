import { FC, HTMLAttributes, useEffect, useState } from 'react';
import { scale, Link, useLinkCSS } from '@greensight/core-components-common';

import CheckIcon from '@icons/small/check.svg';
import CopyIcon from '@icons/small/copy.svg';

export interface CopyButtonProps extends Omit<HTMLAttributes<HTMLButtonElement>, 'children'> {
    children: string;
    timeout?: number;
    linkStyle?: Link;
}

const CopyButton: FC<CopyButtonProps> = ({ children, timeout = 1000, linkStyle, ...props }) => {
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
                <CheckIcon css={{ marginLeft: scale(1, true) }} />
            ) : (
                <CopyIcon css={{ marginLeft: scale(1, true) }} />
            )}
        </button>
    );
};

export default CopyButton;
