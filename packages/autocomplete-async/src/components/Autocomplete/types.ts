import type { FormControlProps } from '@ensi-platform/core-components-form-control';
import type { InputProps } from '@ensi-platform/core-components-input';
import type { FieldProps, SelectProps, SelectThemeProps } from '@ensi-platform/core-components-select';
import type { SelectWithTagsProps } from '@ensi-platform/core-components-select-with-tags';

import type { ChangeEvent, FC, ReactNode, RefAttributes } from 'react';

export interface IAutocompleteProps
    extends Omit<SelectThemeProps, 'options'>,
        Omit<SelectProps, 'Field' | 'nativeSelect'>,
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
