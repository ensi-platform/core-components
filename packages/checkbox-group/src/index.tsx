import {
    ChangeEvent,
    Children,
    cloneElement,
    isValidElement,
    useRef,
    FocusEvent,
    ReactNode,
    CSSProperties,
    useMemo,
} from 'react';

import {
    CheckboxSize,
    CheckboxVariant,
    CheckboxTheme,
    checkboxThemes,
    CheckboxThemeState,
} from '@greensight/core-components-checkbox';

import { scale, useThemeCSSPart, FormFieldDescendantProps } from '@greensight/core-components-common';

export interface CheckboxGroupProps extends FormFieldDescendantProps<string[]> {
    /** Заголовок группы */
    label?: string;

    /** Name of checkbox group (inner) */
    name?: string;


    /** Hint for Legend hint */
    hint?: string;

    /** Text for indeterminate checkbox */
    indeterminate?: string;

    /**
     * Дочерние элементы. Ожидаются компоненты `Checkbox`
     */
    children: ReactNode;

    /**
     * Управление возможностью изменения состояния 'checked' дочерних компонентов CheckBox
     */
    disabled?: boolean;

    /**
     * Обработчик блюра.
     */
    onBlur?: (event: FocusEvent<HTMLDivElement>) => void;

    /**
     * Обработчик фокуса.
     */
    onFocus?: (event: FocusEvent<HTMLDivElement>) => void;

    className?: string;

    gap?: CSSProperties['marginBottom'];

    theme?: CheckboxTheme;
    size?: keyof typeof CheckboxSize;
    variant?: keyof typeof CheckboxVariant;
}

export const CheckboxGroup = ({
    name,
    meta,
    label,
    hint,
    field,
    className,
    children,
    onBlur,
    gap = scale(1),
    onFocus,
    size = 'md',
    variant = 'primary',
    theme = checkboxThemes.basic,
    disabled,
    ...props
}: CheckboxGroupProps) => {
    const ref = useRef<HTMLDivElement>(null);

    const inputProps = {
        type: 'checkbox',
        name,
        id: name,
        ...props,
    };

    const themeState = useMemo<CheckboxThemeState>(
        () => ({
            align: 'start',
            block: false,
            checked: false,
            disabled,
            error: !!meta?.error,
            focused: false,
            inactive: false,
            indeterminate: false,
            variant,
            size,
        }),
        [disabled, meta?.error, size, variant]
    );

    const getCSS = useThemeCSSPart(theme, themeState);

    return (
        <div css={{ display: 'flex', position: 'relative', flexDirection: 'column' }} className={className}>
            {label && <span>{label}</span>}
            {hint && (
                <span
                    css={{
                        ...getCSS('hint'),
                        marginBottom: scale(1),
                    }}
                >
                    {hint}
                </span>
            )}
            <div
                ref={ref}
                onBlur={onBlur}
                onFocus={onFocus}
                css={{
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                {children &&
                    Children.map(children, (child, index) => {
                        if (isValidElement(child)) {
                            const totalProps = {
                                ...child.props,
                                meta,
                                checked: (field?.value || []).includes(child.props.value),
                                onChange: (e: ChangeEvent<HTMLInputElement>) => {
                                    const value = child.props.value || e.target.value;
                                    const valueArray = (field?.value || []) as string[];
                                    const foundIdx = valueArray.indexOf(value);

                                    if (foundIdx === -1) {
                                        valueArray.push(value);
                                    } else {
                                        valueArray.splice(foundIdx, 1);
                                    }

                                    const newValue = valueArray.sort((a, b) => {
                                        if (a < b) return -1;
                                        if (a > b) return 1;

                                        return 0;
                                    });

                                    field?.onChange({
                                        target: {
                                            value: newValue,
                                        },
                                    });
                                },
                                ...(index !== Children.count(children) - 1 && { css: { marginBottom: gap } }),
                                ...inputProps,
                            };
                            return cloneElement(child, totalProps);
                        }
                    })}
            </div>
        </div>
    );
};

export default CheckboxGroup;
