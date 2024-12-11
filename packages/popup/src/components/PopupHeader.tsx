import { BaseModalContext } from '@ensi-platform/core-components-base-modal';
import { IconCross, scale } from '@ensi-platform/core-components-common';

import { useContext, useEffect } from 'react';

import { usePopupContext } from '../scripts';
import type { IPopupHeaderProps } from '../types';

const PopupHeader = ({ className, addonCSS, contentCSS, leftAddons, children, title }: IPopupHeaderProps) => {
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
            css={getCSS('header', { offset: headerOffset, hasContent, highlighted: headerHighlighted })}
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
                        ...getCSS('headerContent'),
                        ...contentCSS,
                    }}
                >
                    {children}
                    {title && <div css={getCSS('headerTitle')}>{title}</div>}
                </div>
            )}

            {hasCloser && (
                <button type="button" onClick={e => onClose(e, 'closerClick')}>
                    <IconCross css={getCSS('headerCloser')} />
                </button>
            )}
        </div>
    );
};

export default PopupHeader;
