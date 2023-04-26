import { FC, HTMLProps } from 'react';

import { scale, typography, useTheme } from '@scripts/gds';

import CrossIcon from '@icons/cross.svg';

const CloseButton: FC<HTMLProps<HTMLButtonElement>> = props => (
    <button
        aria-label="Закрыть панель"
        css={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: scale(8) + scale(1, true),
            height: scale(6) + scale(1, true),
            transition: 'opacity ease-in 300ms',
            ':hover': { opacity: 0.8 },
        }}
        {...props}
        type="button"
    >
        <CrossIcon />
    </button>
);

export interface HeaderProps extends HTMLProps<HTMLDivElement> {
    title: string;
    hasCloseButton?: boolean;
    onClose?: () => void;
}

export const Header: FC<HeaderProps> = ({ title = '', hasCloseButton = true, onClose, ...props }: HeaderProps) => {
    const { colors } = useTheme();
    return (
        <div
            css={{
                padding: `${scale(2)}px ${scale(3)}px`,
                borderBottom: `1px solid ${colors?.grey200}`,
                background: colors?.white,
                marginTop: 'auto',
                ...(hasCloseButton && { paddingRight: scale(8) + scale(1, true) }),
            }}
            {...props}
        >
            {hasCloseButton && onClose && <CloseButton onClick={onClose} />}
            {title && <p css={typography('h3')}>{title}</p>}
        </div>
    );
};
