/* eslint-disable react-hooks/rules-of-hooks */
import type { Meta, StoryObj } from '@storybook/react';
import { ComponentProps, useMemo, useState } from 'react';
import * as Yup from 'yup';

import Form from '@components/Form';

import { Button, scale } from '@scripts/gds';

import FormikSelect, { SimpleSelect as NewSelect } from '.';
import README from './README.md';
import useSelectClear from './presets/useSelectClear';

export default {
    title: 'Components / Select',
    component: NewSelect,
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
} as Meta<typeof NewSelect>;

export const Basic: StoryObj<
    ComponentProps<typeof NewSelect> & {
        closeOnClear: boolean;
    }
> = {
    args: {
        closeOnClear: false,
        wrap: true,
        multiple: false,
        disabled: false,
        closeOnSelect: true,
        options: [
            {
                key: 'disabled',
                content: 'disabled',
                value: 'disabled',
                disabled: true,
            },
            {
                key: 'true',
                content: 'True value',
                value: true,
            },
            {
                key: 'false',
                content: 'False value',
                value: false,
            },
            {
                key: 'zero',
                content: <i>Zero value</i>,
                value: 0,
            },
            {
                key: 'empty string value',
                content: 'Empty string',
                value: '',
            },
            {
                key: 'tough content',
                content: <strong>You can use bold</strong>,
                value: 'bold',
            },
            {
                key: '1',
                content: '1',
                value: '1',
            },
            {
                key: '3',
                content: '3',
                value: '3',
            },
            {
                key: '4',
                content: '4',
                value: '4',
            },
            {
                key: '5',
                content: 'Also may be a long string you decide what to do with it',
                value: '5',
            },
        ],
    },
    parameters: {
        docs: {
            description: {
                story: 'Uncontrolled',
            },
        },
    },
    render: ({ closeOnClear, ...args }) => {
        const [value, setValue] = useState<any>();
        const [open, setOpen] = useState(false);
        const clearSelectProps = useSelectClear({
            closeOnClear,
        });
        const selectedValues = useMemo(() => (Array.isArray(value) ? value : [value]), [value]);
        const selected = useMemo(
            () =>
                args.options
                    .filter(e => {
                        if ('value' in e) {
                            return selectedValues.includes(e.value);
                        }
                        return false;
                    })
                    .map(e => (e as any).key),
            [args.options, selectedValues]
        );
        return (
            <div style={{ width: 500, minHeight: 800 }}>
                <p>
                    Выбрано значение: <b>{value === undefined ? '(undefined)' : JSON.stringify(value)}</b>
                </p>
                <NewSelect
                    {...args}
                    name="name"
                    onChange={e => {
                        if (!args.multiple) {
                            setValue(e.selected?.value);
                        } else {
                            setValue(e.selectedMultiple?.map(e => e.value) || []);
                        }
                    }}
                    selected={selected}
                    open={open}
                    onOpen={payload => {
                        setOpen(payload.open!);
                    }}
                    allowUnselect
                    placeholder="Выберите"
                    {...clearSelectProps}
                />
                <Button css={{ marginTop: scale(1) }} onClick={() => setOpen(!open)}>
                    {!open ? 'Открыть' : 'Закрыть'} вручную
                </Button>
            </div>
        );
    },
};

export const InsideForm: StoryObj<ComponentProps<typeof NewSelect>> = {
    args: {
        multiple: false,
        disabled: false,
        wrap: true,
        options: [
            {
                key: '1',
                content: '1',
                value: '1',
            },
            {
                key: '2',
                content: '2',
                value: '2',
                disabled: true,
            },
            {
                key: '3',
                content: '3',
                value: '3',
            },
            {
                key: '4',
                content: '4',
                value: '4',
            },
            {
                key: '5',
                content: '5',
                value: '5',
            },
            {
                key: '6',
                content: '6',
                value: '6',
            },
            {
                key: '7',
                content: '7',
                value: '7',
            },
        ],
    },
    render: args => (
        <Form
            initialValues={{ selectValue: '', otherField: '' }}
            validationSchema={Yup.object().shape({
                selectValue: Yup.string().required('Обязательное поле'),
                otherField: Yup.string().required('Обязательное поле'),
            })}
            onSubmit={console.log}
        >
            {({ watch }) => (
                <>
                    <p>
                        Значение из формы: <b>{JSON.stringify(watch())}</b>
                    </p>
                    <Form.Field name="selectValue" label="Я селект">
                        <FormikSelect {...args} css={{ minWidth: 200 }} />
                    </Form.Field>
                    <br />
                    <Form.Field name="otherField" placeholder="При вводе в это поле нет лагов перерендера" size="md" />
                    <br />
                    <Button type="submit">Отправить</Button>
                    <Button type="reset" theme="secondary">
                        Сбросить
                    </Button>
                </>
            )}
        </Form>
    ),
};
