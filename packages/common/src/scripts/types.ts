import { type ChangeEvent } from 'react';

type OnChangeEvent<TValue> = ChangeEvent<HTMLInputElement> | { target: { value: TValue } };

export interface FormFieldDescendantProps<TValue = any, TPayload = never> {
    field?: {
        /**
         * Универсальный обработчик изменения значения поля
         */
        onChange: never extends TPayload
            ? (event: OnChangeEvent<TValue>) => void
            : (event: OnChangeEvent<TValue>, payload: TPayload) => void;

        /**
         * Обработчик потери фокуса
         */
        onBlur?: () => void;

        /**
         * Значение хранимое в форме
         */
        value?: TValue;
    };

    helpers?: { setValue: (value: TValue) => void };

    meta?: {
        /**
         * Ошибка в поле. Если нужна логика с touched, нужно в компоненте формы ее задавать.
         */
        error?: string;
    };
}
