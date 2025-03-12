import { Button, scale } from '@ensi-platform/core-components-common';
import { Form, FormFieldWrapper, FormReset } from '@ensi-platform/core-components-form';
import type { Select, SelectHandlers, SelectItem } from '@ensi-platform/core-components-select';

import { action } from '@storybook/addon-actions';
import type { StoryObj } from '@storybook/react';

import * as Yup from 'yup';
import { type ChangeEvent, type ComponentProps, useCallback, useState } from 'react';

import README from '../README.md';
import { AutocompleteAsync } from './Component';
import { Autocomplete, BaseAutocomplete } from './components';
import type { IOptionsFetcherResponse } from './types';

export default {
    title: 'Components / AutocompleteAsync',
    component: () => AutocompleteAsync,
    parameters: {
        docs: {
            description: {
                component: README,
            },
        },
        backgrounds: {
            default: 'grey100',
        },
    },
};

const optionItems: SelectItem[] = [
    {
        label: 'laborum est',
        value: 0,
    },
    {
        label: 'id anim',
        value: 1,
    },
    {
        label: 'mollit deserunt',
        value: 2,
    },
    {
        label: 'officia qui',
        value: 3,
    },
    {
        label: 'culpa in',
        value: 4,
    },
    {
        label: 'sunt proident',
        value: 5,
    },
    {
        label: 'non cupidatat',
        value: 6,
    },
    {
        label: 'occaecat sint',
        value: 7,
    },
    {
        label: 'excepteur pariatur',
        value: 8,
    },
    {
        label: 'nulla fugiat',
        value: 9,
    },
    {
        label: 'eu dolore',
        value: 10,
    },
    {
        label: 'cillum esse',
        value: 11,
    },
    {
        label: 'velit voluptate',
        value: 12,
    },
    {
        label: 'in reprehenderit',
        value: 13,
    },
    {
        label: 'in dolor',
        value: 14,
    },
    {
        label: 'irure aute',
        value: 15,
    },
    {
        label: 'duis consequat',
        value: 16,
    },
    {
        label: 'commodo ea',
        value: 17,
    },
    {
        label: 'ex aliquip',
        value: 18,
    },
    {
        label: 'ut nisi',
        value: 19,
    },
    {
        label: 'laboris ullamco',
        value: 20,
    },
    {
        label: 'exercitation nostrud',
        value: 21,
    },
    {
        label: 'quis veniam',
        value: 22,
    },
    {
        label: 'minim ad',
        value: 23,
    },
    {
        label: 'enim ut',
        value: 24,
    },
    {
        label: 'aliqua magna',
        value: 25,
    },
    {
        label: 'dolore et',
        value: 26,
    },
    {
        label: 'labore ut',
        value: 27,
    },
    {
        label: 'incididunt tempor',
        value: 28,
    },
    {
        label: 'eiusmod do',
        value: 29,
    },
    {
        label: 'sed elit',
        value: 30,
    },
    {
        label: 'adipiscing consectetur',
        value: 31,
    },
    {
        label: 'amet sit',
        value: 32,
    },
    {
        label: 'dolor ipsum',
        value: 33,
    },
];

export const Basic: StoryObj<ComponentProps<typeof AutocompleteAsync>> = {
    args: {
        closeOnSelect: false,
    },
    argTypes: {
        closeOnSelect: Boolean,
    },
    render: (...args) => {
        const asyncSearchFn = useCallback(
            async (queryString: string, offset: number, limit: number): Promise<IOptionsFetcherResponse> =>
                new Promise(resolve => {
                    const total = optionItems.filter(e => e.label.includes(queryString));
                    const slice = total.slice(offset, offset + limit);
                    const hasMore = offset + limit < total.length;
                    setTimeout(() => resolve({ options: slice, hasMore }), 1500);
                }),
            []
        );
        const asyncOptionsByValuesFn = useCallback(
            async (vals: string[]): Promise<SelectItem[]> =>
                new Promise(resolve => {
                    const total = optionItems.filter(e => e.value && vals.includes(e.value.toString()));
                    setTimeout(() => resolve(total), 1800);
                }),
            []
        );

        return (
            <>
                <h2>The only choice:</h2>
                <AutocompleteAsync
                    {...args}
                    block
                    asyncSearchFn={asyncSearchFn}
                    asyncOptionsByValuesFn={asyncOptionsByValuesFn}
                    placeholder="Start introducing"
                />
            </>
        );
    },
};

export const WithForm: StoryObj<ComponentProps<typeof Select>> = {
    args: {},
    argTypes: {},
    render: () => {
        const asyncSearchFn = useCallback(
            async (queryString: string, offset: number, limit: number): Promise<IOptionsFetcherResponse> =>
                new Promise(resolve => {
                    const total = optionItems.filter(e => e.label.includes(queryString));
                    const slice = total.slice(offset, offset + limit);
                    const hasMore = offset + limit < total.length;
                    setTimeout(() => resolve({ options: slice, hasMore }), 1500);
                }),
            []
        );
        const asyncOptionsByValuesFn = useCallback(
            async (vals: number[]): Promise<SelectItem[]> =>
                new Promise(resolve => {
                    const total = optionItems.filter(e => e.value && vals.some(val => val === e.value));
                    setTimeout(() => resolve(total), 1800);
                }),
            []
        );

        return (
            <div style={{ width: 500, minHeight: 800 }}>
                <Form
                    initialValues={{ selectValue: [3] }}
                    validationSchema={Yup.object().shape({
                        selectValue: Yup.array().min(1, 'Required field').required('Required field'),
                    })}
                    onSubmit={action('onSubmit')}
                >
                    <FormFieldWrapper name="selectValue" label="Select items" required>
                        <AutocompleteAsync
                            closeOnSelect={false}
                            asyncSearchFn={asyncSearchFn}
                            asyncOptionsByValuesFn={asyncOptionsByValuesFn}
                            collapseTagList
                            multiple
                        />
                    </FormFieldWrapper>
                    <br />
                    <Button type="submit" style={{ marginRight: scale(2) }}>
                        Submit
                    </Button>
                    <FormReset theme="secondary">Reset</FormReset>
                </Form>
            </div>
        );
    },
};

export const ControlledAutocomplete: StoryObj<ComponentProps<typeof Autocomplete>> = {
    args: {
        closeOnSelect: false,
    },
    argTypes: {
        closeOnSelect: Boolean,
    },
    parameters: {
        docs: {
            description: {
                component: README,
            },
        },
        backgrounds: {
            default: 'grey100',
        },
    },
    render: (...args) => {
        const matchOption = (option: SelectItem, inputValue: string) =>
            option.label.toLowerCase().includes((inputValue || '').toLowerCase());
        const [value, setValue] = useState('');
        const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
            setValue(event.target.value);
        };

        const handleChange: SelectHandlers['onChange'] = (event, payload) => {
            const value = payload.selected?.[0]?.label || '';
            setValue(value);
        };
        const inputValues = value;
        const selectedOptions = optionItems.filter(option => inputValues.includes(option.label.trim()));
        const selected = selectedOptions.map(option => option.label);
        const filteredOptions =
            inputValues.length === selected.length
                ? optionItems
                : optionItems.filter(
                      option =>
                          selectedOptions.includes(option) || matchOption(option, inputValues[inputValues.length - 1])
                  );

        return (
            <BaseAutocomplete
                options={filteredOptions}
                selected={selectedOptions}
                label="Element"
                value={value}
                allowUnselect
                onChange={handleChange}
                onInput={handleInput}
                {...args}
            />
        );
    },
};

export const regularAutocomplete: StoryObj<ComponentProps<typeof Autocomplete>> = {
    args: {
        closeOnSelect: false,
        multiple: true,
    },
    argTypes: {
        closeOnSelect: Boolean,
        multiple: Boolean,
    },
    parameters: {
        docs: {
            description: {
                component: README,
            },
        },
        backgrounds: {
            default: 'grey100',
        },
    },
    render: args => <Autocomplete {...args} options={optionItems} />,
};
