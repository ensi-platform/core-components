import type { FormFieldHelperProps } from '@ensi-platform/core-components-common';
import type { OptionProps, SelectItem } from '@ensi-platform/core-components-select';
import type { SelectWithTagsProps } from '@ensi-platform/core-components-select-with-tags';

import type { FC, ReactNode } from 'react';

export interface IOptionsFetcherResponse {
    options: SelectItem[];
    hasMore: boolean;
}

export interface IUseLazyLoadingProps {
    isValuesLoading?: boolean;
    clearOnClose?: boolean;
    limit?: number;
    initialOffset?: number;
    skeleton?: ReactNode;
    Option?: FC<OptionProps>;
    optionsFetcher(queryString: string, offset: number, limit: number): Promise<IOptionsFetcherResponse>;
    onOptionsChange?: (options: SelectItem[]) => void;
}

export interface AutocompleteAsyncState {
    /**
     * Возможность выбрать несколько значений
     */
    multiple?: boolean;
    clearOnSelect?: boolean;
    extractKeyFromValue?: (value: any) => string;
}
export interface AutocompleteAsyncHandlers {
    onInput?: SelectWithTagsProps['onInput'];
    /**
     * Обработчик выбора
     */
    onChange?: (payload: { selected: SelectItem[] | null; actionItem?: SelectItem | null; name?: string }) => void;

    /**
     * Обработчик загрузки новых опций. Предполагается,
     * что в родительском компоненте будет писаться в ref.current
     */
    onOptionsChange?: (options: SelectItem[]) => void;

    onClear?: () => void;
}

type ValOrArr<T> = T | T[];
type AutocompleteAsyncValue = ValOrArr<string | number | object | null>;

export type AutocompleteAsyncPropsType = Omit<
    SelectWithTagsProps,
    'options' | 'selected' | 'value' | 'onInput' | 'onChange'
> &
    Partial<FormFieldHelperProps<AutocompleteAsyncValue>> &
    AutocompleteAsyncHandlers &
    AutocompleteAsyncState & {
        asyncSearchFn: IUseLazyLoadingProps['optionsFetcher'];
        /**
         * Фетчер-функция для получения опций из массива уже выбранных значений
         * @param values массив выбранных значений
         */
        asyncOptionsByValuesFn(values: any[], abortController: AbortController): Promise<SelectItem[]>;
    };
