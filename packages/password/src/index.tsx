import { HTMLProps, useState } from 'react';

import { defaultTheme, FormFieldHelperProps, IconSmallEye, IconSmallEyeOff } from '@greensight/core-components-common';
import { Input } from '@greensight/core-components-input';

const { colors } = defaultTheme;

export interface PasswordProps extends HTMLProps<HTMLInputElement>, Partial<FormFieldHelperProps<string>> {
    /** Custom icon */
    Icon?: () => JSX.Element;
}

export const Password = ({ field, meta, autoComplete = 'off', ...props }: PasswordProps) => {
    delete props.Icon;
    const [isVisible, setIsVisible] = useState(false);

    const inputProps = { ...field, ...props };

    return (
        <>
            <Input
                value={field?.value || ''}
                onChange={field?.onChange}
                error={meta?.error}
                autoComplete={autoComplete}
                type={isVisible ? 'text' : 'password'}
                rightAddons={
                    <button
                        type="button"
                        onClick={() => setIsVisible(!isVisible)}
                        css={{
                            width: '100%',
                            height: '100%',
                            color: isVisible ? colors.black : colors.grey200,
                            transition: 'fill ease 300ms',
                            ':focus': { outlineOffset: 0, outlineColor: colors.primary, outlineWidth: 2 },
                        }}
                    >
                        {isVisible ? (
                            <IconSmallEyeOff title="Показать пароль" />
                        ) : (
                            <IconSmallEye title="Скрыть пароль" />
                        )}
                    </button>
                }
            />
            {autoComplete === 'off' && <input name={inputProps.name} type="password" style={{ display: 'none' }} />}
        </>
    );
};
