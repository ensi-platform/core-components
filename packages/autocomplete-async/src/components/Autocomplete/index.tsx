import { forwardRef, useMemo } from 'react';

import {
    BaseSelect,
    Option as DefaultOption,
    OptionsList as DefaultOptionsList,
    Arrow as DefaultArrow,
} from '@greensight/core-components-select';

import { TagList } from '@greensight/core-components-select-with-tags';

import { IAutocompleteProps } from './types';
import AutocompleteField from '../Field';

export const Autocomplete = forwardRef<HTMLInputElement, IAutocompleteProps>(
    (
        {
            Arrow = DefaultArrow,
            OptionsList = DefaultOptionsList,
            Option = DefaultOption,
            Input,
            inputProps = {},
            onInput,
            value,
            readOnly,
            multiple,
            closeOnSelect = !multiple,
            options = [],
            fieldProps,
            ...restProps
        },
        ref
    ) => {
        const props = useMemo(
            () => ({
                ref,
                autocomplete: true,
                options,
                closeOnSelect,
                Option,
                Arrow,
                multiple,
                Field: multiple ? TagList : AutocompleteField,
                fieldProps: {
                    Input,
                    onInput,
                    value,
                    inputProps,
                    readOnly,
                    ...fieldProps,
                },

                OptionsList,
                ...restProps,
            }),
            [
                multiple,
                Arrow,
                Input,

                Option,
                OptionsList,
                closeOnSelect,
                fieldProps,
                inputProps,
                onInput,
                options,
                readOnly,
                ref,
                restProps,
                value,
            ]
        );

        return <BaseSelect emitChangeOnClick {...props} />;
    }
);

Autocomplete.displayName = 'Autocomplete';
