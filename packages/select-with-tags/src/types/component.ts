import type { ChangeEvent, ReactNode } from 'react';

import { SelectItem, SelectPayload, SelectProps } from '@greensight/core-components-select';
import { TagComponent } from './common';

interface SelectWithTagsStates {
    /**
     * Значение поля ввода
     */
    value: string;
    isLoading?: boolean;
    resetOnChange?: boolean;
    resetOnClose?: boolean;
    /**
     * Список выбранных пунктов (controlled-селект)
     */
    selected?: SelectItem[] | null;
}
interface SelectWithTagsHandlers {
    onReset?: () => void;

    /**
     * Обработчик ввода
     */
    onInput: (event: ChangeEvent<HTMLInputElement>) => void;

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
     * Сворачивать при закрытии. По-умолчанию выключено
     */
    collapseOnClose?: boolean;
}
interface SelectWithTagsParts {
    /**
     * Компонент Тэг
     */
    Tag?: TagComponent;
}
interface SelectWithTagsPartsProps {
    /**
     * Показывать тэги только в одном ряду, а если не помещаются в один ряд - схлопнуть в одну кнопку
     */
    collapseTagList?: boolean;

    /**
     * Трансформировать текст компонента Тэг который отображает общее количество выбранных элементов
     */
    transformCollapsedTagText?: (collapsedCount: number) => string;

    /**
     * Трансформировать текст компонента Тэг
     */
    transformTagText?: (tagText?: ReactNode) => ReactNode;
}

export interface SelectWithTagsProps
    extends Omit<SelectProps, 'multiple' | 'selected' | 'onReset' | 'onInput' | 'onChange'>,
        SelectWithTagsStates,
        SelectWithTagsHandlers,
        SelectWithTagsParts,
        SelectWithTagsPartsProps {
    /**
     * Режим автокомплита
     */
    autocomplete?: boolean;

    /**
     * Если текст не помещается в инпут, то нужно перенести инпут на новую строку.
     */
    moveInputToNewLine?: boolean;

    overflow?: 'grow-height' | 'truncate';
}
