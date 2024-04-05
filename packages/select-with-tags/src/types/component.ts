import type { ChangeEvent, FC, ReactNode } from 'react';
import { TagProps } from '@greensight/core-components-tags';
import { SelectItem, SelectPayload, SelectProps } from '@greensight/core-components-select';

export type OptionMatcher = (option: SelectItem, inputValue: string) => boolean;

export type TagComponent = FC<TagProps>;

export interface SelectWithTagsProps extends Omit<SelectProps, 'multiple'> {
    /**
     * Значение поля ввода
     */
    value: string;

    isLoading?: boolean;
    resetOnChange?: boolean;
    resetOnClose?: boolean;

    onReset?: () => void;

    /**
     * Обработчик ввода
     */
    onInput: (event: ChangeEvent<HTMLInputElement>) => void;

    /**
     * Список выбранных пунктов (controlled-селект)
     */
    selected?: SelectItem[] | null;

    /**
     * Обработчик выбора
     */
    onChange?: (
        event: {
            target: { value: Array<string | SelectItem> | string | SelectItem | null };
        },
        payload: SelectPayload
    ) => void;

    /**
     * Режим автокомплита
     */
    autocomplete?: boolean;

    /**
     * Компонент Тэг
     */
    Tag?: TagComponent;

    /**
     * Показывать тэги только в одном ряду, а если не помещаются в один ряд - схлопнуть в одну кнопку
     */
    collapseTagList?: boolean;

    /**
     * Если текст не помещается в инпут, то нужно перенести инпут на новую строку.
     */
    moveInputToNewLine?: boolean;

    overflow?: 'grow-height' | 'truncate';

    /**
     * Сворачивать при закрытии. По-умолчанию выключено
     */
    collapseOnClose?: boolean;

    /**
     * Трансформировать текст компонента Тэг который отображает общее количество выбранных элементов
     */
    transformCollapsedTagText?: (collapsedCount: number) => string;

    /**
     * Трансформировать текст компонента Тэг
     */
    transformTagText?: (tagText?: ReactNode) => ReactNode;
}
