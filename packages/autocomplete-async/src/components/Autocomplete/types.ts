import { ChangeEvent, FC, ReactNode, RefAttributes } from 'react';

import { SelectProps, FieldProps, SelectThemeProps } from '@greensight/core-components-select';
import type { FormControlProps } from '@greensight/core-components-form-control';
import type { InputProps } from '@greensight/core-components-input';
import type { SelectWithTagsProps } from '@greensight/core-components-select-with-tags';

export interface IAutocompleteProps
    extends SelectThemeProps,
        Omit<SelectProps, 'Field' | 'nativeSelect' | 'options'>,
        Partial<
            Pick<
                SelectWithTagsProps,
                'collapseTagList' | 'moveInputToNewLine' | 'transformCollapsedTagText' | 'transformTagText'
            >
        >,
        Pick<InputProps, 'readOnly'> {
    /**
     * Компонент ввода значения
     */
    Input?: FC<InputProps & RefAttributes<HTMLInputElement>>;

    /**
     * Пропсы, которые будут прокинуты в инпут
     */
    inputProps?: InputProps & Record<string, unknown>;

    /**
     * Значение поля ввода
     */
    value?: string;

    /**
     * Обработчик ввода
     */
    onInput?: (event: ChangeEvent<HTMLInputElement>) => void;

    /** Включить нижние теги */
    withTags?: boolean;

    /**
     * В состоянии без фокуса показывает по формуле {placeholderSelected} {selectedCount}
     */
    placeholderSelected?: string;
}

export type AutocompleteFieldPropsType = FieldProps &
    Pick<IAutocompleteProps, 'Input' | 'inputProps' | 'value' | 'onInput' | 'readOnly'> & {
        name?: string;
        bottomAddons?: ReactNode;
        size?: FormControlProps['size'];
    };
