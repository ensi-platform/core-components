import { IconSmallEye, IconSmallEyeOff, defaultTheme } from '@ensi-platform/core-components-common';

import { type FC, useCallback } from 'react';

import type { IPasswordButtonProps } from './types';

const { colors } = defaultTheme;

const PasswordButton: FC<IPasswordButtonProps> = ({ visible, setVisible, ...props }) => {
    const onClick = useCallback(() => setVisible(!visible), [setVisible, visible]);
    return (
        <button
            type="button"
            onClick={onClick}
            css={{
                width: '100%',
                height: '100%',
                color: visible ? colors.black : colors.grey200,
                transition: 'fill ease 300ms',
                ':focus': { outlineOffset: 0, outlineColor: colors.primary, outlineWidth: 2 },
            }}
            {...props}
        >
            {visible ? <IconSmallEyeOff title="Показать пароль" /> : <IconSmallEye title="Скрыть пароль" />}
        </button>
    );
};

export default PasswordButton;
