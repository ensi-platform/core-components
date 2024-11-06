import { ButtonHTMLAttributes, forwardRef } from 'react';
import { Button } from '@ensi-platform/core-components-common';
import useCalendarTheme from '../../scripts/useCalendarTheme';

export type SelectButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    /**
     * Дополнительный класс
     */
    className?: string;

    /**
     * Вид кнопки
     */
    view?: 'default' | 'outlined' | 'selected';
};

export const SelectButton = forwardRef<HTMLButtonElement, SelectButtonProps>(
    ({ className, children, view = 'default', ...restProps }, ref) => {
        const { getCSS } = useCalendarTheme();

        return (
            <Button
                {...restProps}
                ref={ref}
                // theme="ghost"
                size="sm"
                className={className}
                css={getCSS('selectButton', { buttonVariant: view })}
            >
                {children}
            </Button>
        );
    }
);
