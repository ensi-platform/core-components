import { BaseModalContext } from '@ensi-platform/core-components-base-modal';
import { Layout } from '@ensi-platform/core-components-common';

import { CSSObject } from '@emotion/react';

import { useContext, useEffect } from 'react';

import { usePopupContext } from '../PopupContext';
import { FooterProps } from '../types';

export const Footer = ({ children, className, ...props }: FooterProps) => {
    const { footerHighlighted, setHasFooter } = useContext(BaseModalContext);
    const { getCSS } = usePopupContext();

    useEffect(() => {
        setHasFooter(true);
    }, [setHasFooter]);

    return (
        <Layout
            className={className}
            css={getCSS('footer', { highlighted: footerHighlighted }) as CSSObject}
            {...props}
            {...(props.type !== 'flex' &&
                !props.cols &&
                ({
                    cols: 2,
                } as any))}
        >
            {children}
        </Layout>
    );
};
