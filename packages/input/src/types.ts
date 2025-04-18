import type { FormControlProps } from '@ensi-platform/core-components-form-control';

import type { CSSObject } from '@emotion/react';

import type { ChangeEvent, InputHTMLAttributes, MouseEvent, ReactNode, Ref } from 'react';

export type InputProps = Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'size' | 'type' | 'value' | 'defaultValue' | 'onChange' | 'onClick' | 'onMouseDown' | 'enterKeyHint'
> & {
    /**
     * Значение поля ввода
     */
    value?: string;

    /**
     * Начальное значение поля
     */
    defaultValue?: string;

    error?: string;

    /**
     * Растягивает компонент на ширину контейнера
     */
    block?: boolean;

    /**
     * Крестик для очистки поля
     */
    clear?: boolean;

    theme?: FormControlProps['theme'] | keyof FormControlProps['theme'];
    variant?: FormControlProps['variant'];
    size?: FormControlProps['size'];
    labelWrap?: FormControlProps['labelWrap'];
    /**
     * Флаг отображения ошибки
     */
    showError?: boolean;

    /**
     * Текст подсказки
     */
    hint?: ReactNode;

    /**
     * Лейбл компонента
     */
    label?: ReactNode;

    /**
     * Атрибут type
     */
    type?: 'number' | 'card' | 'email' | 'money' | 'password' | 'tel' | 'text' | 'time' | 'color' | 'url' | 'link';

    /**
     * Ref для обертки input
     */
    wrapperRef?: Ref<HTMLDivElement>;

    /**
     * Слот слева
     */
    leftAddons?: ReactNode;

    /**
     * Слот справа
     */
    rightAddons?: ReactNode;

    /**
     * Внутренний слот слева
     */
    innerLeftAddons?: ReactNode;

    /**
     * Слот под инпутом
     */
    bottomAddons?: ReactNode;

    /**
     * Дополнительный класс
     */
    className?: string;

    /**
     * Дополнительный стиль для поля
     */
    fieldCSS?: CSSObject;

    /**
     * Дополнительный стиль для обертки
     */
    wrapperCSS?: CSSObject;

    /**
     * Дополнительный стиль инпута
     */
    inputCSS?: CSSObject;

    /**
     * Дополнительный стиль для лейбла
     */
    labelCSS?: CSSObject;

    /**
     * Дополнительный стиль для аддонов
     */
    leftAddonsCSS?: CSSObject;
    rightAddonsCSS?: CSSObject;

    /**
     * Запрещает ввод с клавиатуры
     */
    disableUserInput?: boolean;

    /**
     * Обработчик поля ввода
     */
    onChange?: (event: ChangeEvent<HTMLInputElement>, payload: { value: string }) => void;

    /**
     * Обработчик нажатия на кнопку очистки
     */
    onClear?: (event: MouseEvent<HTMLButtonElement>) => void;

    /**
     * Обработчик клика по полю
     */
    onClick?: (event: MouseEvent<HTMLDivElement>) => void;

    /**
     * Обработчик MouseDown по полю
     */
    onMouseDown?: (event: MouseEvent<HTMLDivElement>) => void;

    /**
     * Обработчик MouseUp по полю
     */
    onMouseUp?: (event: MouseEvent<HTMLDivElement>) => void;

    isLegend?: boolean;
};
