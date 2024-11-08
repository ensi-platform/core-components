import { IconCross } from '@ensi-platform/core-components-common';

import { FC, HTMLProps, useMemo } from 'react';

import { useDrawerTheme } from '../context';

const CloseButton: FC<HTMLProps<HTMLButtonElement>> = props => {
    const { getCSS } = useDrawerTheme();

    return (
        <button aria-label="Закрыть панель" css={getCSS('closer')} {...props} type="button">
            <IconCross />
        </button>
    );
};

export interface HeaderProps extends HTMLProps<HTMLDivElement> {
    title: string;
    hasCloseButton?: boolean;
    onClose?: () => void;
}

export const Header: FC<HeaderProps> = ({ title = '', hasCloseButton = true, onClose, ...props }: HeaderProps) => {
    const { getCSS } = useDrawerTheme();
    const styles = useMemo(
        () =>
            getCSS('header', {
                hasCloser: hasCloseButton,
            }),
        [getCSS, hasCloseButton]
    );

    return (
        <div css={styles} {...props}>
            {hasCloseButton && onClose && <CloseButton onClick={onClose} />}
            {title && <p>{title}</p>}
        </div>
    );
};
