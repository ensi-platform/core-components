import { IconSmallCheck, IconSmallCopy, scale, useLinkCSS } from '@ensi-platform/core-components-common';

import { type FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import type { ICopyButtonProps } from './types';

/**
 * A button for copying text content
 */
const CopyButton: FC<ICopyButtonProps> = ({ children, timeout = 1000, linkStyle, ...props }) => {
    const { t } = useTranslation('common');

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
            aria-label={t('common:components.copy')}
            title={t('common:components.copy')}
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

export default CopyButton;
