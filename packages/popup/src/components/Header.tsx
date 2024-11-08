import { BaseModalContext } from '@ensi-platform/core-components-base-modal';
import { IconCross, scale } from '@ensi-platform/core-components-common';

import type { CSSObject } from '@emotion/react';

import { useContext, useEffect } from 'react';

import { usePopupContext } from '../PopupContext';
import type { HeaderProps } from '../types';

export const Header = ({ className, addonCSS, contentCSS, leftAddons, children, title }: HeaderProps) => {
    const { headerOffset, headerHighlighted, setHasHeader, onClose } = useContext(BaseModalContext);

    const {
        getCSS,
        state: { hasCloser },
    } = usePopupContext();

    const hasContent = !!title || Boolean(children);

    useEffect(() => {
        setHasHeader(true);
    }, [setHasHeader]);

    return (
        <div
            className={className}
            css={getCSS('header', { offset: headerOffset, hasContent, highlighted: headerHighlighted }) as CSSObject}
        >
            {leftAddons && (
                <div
                    css={{
                        minHeight: scale(6),
                        height: scale(6),
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        pointerEvents: 'all',
                        ...addonCSS,
                    }}
                >
                    {leftAddons}
                </div>
            )}

            {hasContent && (
                <div
                    css={{
                        ...(getCSS('headerContent') as CSSObject),
                        ...contentCSS,
                    }}
                >
                    {children}
                    {title && <div css={getCSS('headerTitle') as CSSObject}>{title}</div>}
                </div>
            )}

            {hasCloser && (
                <button type="button" onClick={e => onClose(e, 'closerClick')}>
                    <IconCross css={getCSS('headerCloser') as CSSObject} />
                </button>
            )}
        </div>
    );
};
