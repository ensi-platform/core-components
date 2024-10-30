import { StoryObj } from '@storybook/react';

import { ComponentProps, SetStateAction, useCallback, useMemo, useState } from 'react';

import { Button, scale } from '@ensi-platform/core-components-common';
import { SelectItem, SelectPayload } from '@ensi-platform/core-components-select';

import Form from '@ensi-platform/core-components-form';
import { SelectWithTags, SelectWithTagsProps } from '.';
import README from '../README.md';
import { SimpleSelectWithTags } from './SelectWithTags';

const optionItems: SelectItem[] = [
    {
        label: 'true',
        content: 'True value',
        value: true,
    },
    {
        label: 'false',
        content: 'False value',
        value: false,
    },
    {
        label: 'zero',
        content: <i>Zero value</i>,
        value: 0,
    },
    {
        label: 'empty string value',
        content: 'Empty string',
        value: '',
    },
    {
        label: 'you can use bold',
        content: <strong>You can use bold</strong>,
        value: 'bold',
    },
    {
        label: '1',
        content: '1',
        value: '1',
    },
    {
        label: '3',
        content: '3',
        value: '3',
    },
    {
        label: '4',
        content: '4',
        value: '4',
    },
    {
        label: 'also may be a long string you decide what to do with it',
        content: (
            <>
                <s>Also may be</s>&nbsp;a long string <b>you decide what to do with it</b>
            </>
        ),
        value: '5',
    },
];

export default {
    title: 'Components / SelectWithTags',
    component: SelectWithTags,
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

type Args = Omit<ComponentProps<typeof SelectWithTags>, 'isOpen'> & {};

export const Basic: StoryObj<Args> = {
    argTypes: {},
    args: {
        collapseTagList: true,
        moveInputToNewLine: true,
        block: true,
        disabled: false,
        options: optionItems,
        autocomplete: true,
    },
    render: args => {
        const [open, setOpen] = useState(false);
        const [value, setValue] = useState('');
        const [selected, setSelected] = useState<SelectWithTagsProps['selected']>([
            {
                label: 'FakeKey',
                content: 'Not Exist',
                value: true,
            },
            {
                label: 'false',
                content: 'False value',
                value: false,
            },
        ]);
        const selectedValues = useMemo(() => selected?.map((e: SelectItem) => e.value), [selected]);

        const handleInput = (event: { target: { value: SetStateAction<string> } }) => {
            setValue(event.target.value);
        };

        const handleChange: SelectWithTagsProps['onChange'] = useCallback((event: any, payload: SelectPayload) => {
            setSelected(payload.selected === null ? [] : payload.selected);
        }, []);

        const transformCollapsedTagText = (count: number) => `+${count} элементов`;

        return (
            <div style={{ width: 500, minHeight: 800 }}>
                <p>
                    Выбраны значения: <b>{JSON.stringify(selectedValues)}</b>
                </p>
                <SimpleSelectWithTags
                    {...args}
                    name="name"
                    selected={selected}
                    isOpen={open}
                    onOpen={payload => {
                        setOpen(payload.open!);
                    }}
                    placeholder="Выберите"
                    onInput={handleInput}
                    transformCollapsedTagText={transformCollapsedTagText}
                    value={value}
                    onChange={handleChange}
                />
                <Button css={{ marginTop: scale(1) }} onClick={() => setOpen(!open)}>
                    {!open ? 'Открыть' : 'Закрыть'} вручную
                </Button>
            </div>
        );
    },
};

export const WithForm: StoryObj<ComponentProps<typeof SelectWithTags>> = {
    args: {
        disabled: false,
        wrap: true,
        allowUnselect: false,
        options: [
            {
                label: 'Red',
                value: 131,
            },
            {
                label: 'blue',
                value: 42,
            },
        ],
    },
    argTypes: {},
    render: ({ ...args }) => (
        <div style={{ width: 500, minHeight: 800 }}>
            <Form
                initialValues={{ selectValue: null, otherField: '' }}
                onSubmit={values => {
                    console.log('SUBMIT FORM VALUES', values);
                }}
            >
                <Form.Field name="selectValue" label="SelectWithTags" required>
                    <SelectWithTags options={args.options} />
                </Form.Field>
                <br />
                <Form.Field name="otherField" placeholder="При вводе в это поле нет лагов перерендера" size="md" />
                <br />
                <Button type="submit">Отправить</Button>
                <Button type="reset" theme="secondary">
                    Сбросить
                </Button>
            </Form>
        </div>
    ),
};
