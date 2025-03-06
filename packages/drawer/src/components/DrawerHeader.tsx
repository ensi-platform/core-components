import { IconCross } from '@ensi-platform/core-components-common';

import { type FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { useDrawerContext } from '../scripts';
import type { IDrawerHeaderProps } from '../types';

const DrawerHeader: FC<IDrawerHeaderProps> = ({ title, hasCloseButton = false, onClose, ...props }) => {
    const { t } = useTranslation('common');

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
                <button
                    aria-label={t('common:components.closePanel')}
                    css={getCSS('closer')}
                    onClick={onClose}
                    type="button"
                >
                    <IconCross />
                </button>
            )}
            {title && <p>{title}</p>}
        </div>
    );
};

export default DrawerHeader;
