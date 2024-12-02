import { IconCross } from '@ensi-platform/core-components-common';

import { type FC, useMemo } from 'react';

import { useDrawerContext } from '../../scripts';
import type { IHeaderProps } from '../../types';

const Header: FC<IHeaderProps> = ({ title, hasCloseButton = false, onClose, ...props }) => {
    const { getCSS } = useDrawerContext();
    const styles = useMemo(
        () =>
            getCSS('header', {
                hasCloser: hasCloseButton,
            }),
        [getCSS, hasCloseButton]
    );

    return (
        <div css={styles} {...props}>
            {hasCloseButton && onClose && (
                <button aria-label="Закрыть панель" css={getCSS('closer')} onClick={onClose} type="button">
                    <IconCross />
                </button>
            )}
            {title && <p>{title}</p>}
        </div>
    );
};

export default Header;
