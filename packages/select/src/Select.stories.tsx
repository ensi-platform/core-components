import { Button, scale } from '@ensi-platform/core-components-common';
import { Form, FormField, FormFieldWrapper, FormReset } from '@ensi-platform/core-components-form';

import { action } from '@storybook/addon-actions';
import type { StoryObj } from '@storybook/react';

import * as Yup from 'yup';
import { type ComponentProps, useMemo, useState } from 'react';

import { Select, type SelectItem, SimpleSelect } from '.';
import README from '../README.md';

export default {
    title: 'Components / Select',
    component: SimpleSelect,
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
export const Basic: StoryObj<ComponentProps<typeof Select>> = {
    args: {
        options: [
            {
                label: '1',
                content: '1',
                value: '1',
            },
            {
                label: 'disabled',
                content: 'disabled',
                value: 'disabled',
                disabled: true,
            },
            {
                label: 'true label',
                content: 'True value',
                value: true,
            },
            {
                label: 'false false',
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
                label: 'tough content',
                content: <strong>You can use bold</strong>,
                value: 'bold',
            },

            {
                label: '3',
                content: '3',
                value: '3',
            },
            {
                label: '5',
                content: 'Also may be a long string you decide what to do with it',
                value: '5',
            },
        ],
        wrap: true,
        multiple: false,
        disabled: false,
        closeOnSelect: true,
    },
    argTypes: {},
    render: ({ ...args }) => {
        const [value, setValue] = useState<string[] | undefined>();
        const [open, setOpen] = useState(false);

        const selectedValues: (string | undefined)[] = Array.isArray(value) ? value : [value];
        const selected = useMemo(
            () =>
                args.options
                    .filter(e => {
                        if ('value' in e) {
                            if (!args.multiple) {
                                return selectedValues?.includes(e.value);
                            }
                            return selectedValues?.includes(e.value);
                        }
                        return false;
                    })
                    .map(e => e.label),
            [args.options, selectedValues]
        );

        return (
            <div style={{ width: 500, minHeight: 800 }}>
                <p>
                    Выбрано значение: <b>{value === undefined ? '(undefined)' : JSON.stringify(value)}</b>
                </p>
                <SimpleSelect
                    {...args}
                    name="name"
                    onChange={(e, payload) => {
                        if (!args.multiple) {
                            setValue(payload.selected[0].value);
                        } else {
                            setValue(prevValue =>
                                (e.target?.value?.map((e: SelectItem) => e.value) || [])
                                    .filter((item: string) => (prevValue ? !prevValue.includes(item) : true))
                                    .concat(prevValue || [])
                            );
                        }
                    }}
                    selected={selected}
                    isOpen={open}
                    onOpen={payload => {
                        if (payload.open !== undefined) setOpen(payload.open);
                    }}
                    allowUnselect
                    placeholder="Select"
                />
                <Button css={{ marginTop: scale(1) }} onClick={() => setOpen(!open)}>
                    {!open ? 'Open' : 'Close'} manually
                </Button>
            </div>
        );
    },
};

export const WithForm: StoryObj<ComponentProps<typeof Select>> = {
    args: {
        multiple: false,
        disabled: false,
        wrap: true,
        allowUnselect: false,
        options: [
            {
                label: '1 label',
                content: '1 content',
                value: '1',
            },
            {
                label: '2 label',
                content: '2 content',
                value: '2',
            },
            {
                label: '3 label',
                content: '3 content',
                value: '3',
            },
            {
                label: '4 label',
                content: '4 content',
                value: '4',
                disabled: true,
            },
            {
                label: '5 label',
                content: '5 content',
                value: '5',
            },

            {
                label: '6 label',
                content: '6 content',
                value: '6',
            },
            {
                label: '7 label',
                content: '7 content',
                value: '7',
            },
        ],
    },
    argTypes: {},
    render: ({ ...args }) => (
        <div style={{ width: 500 }}>
            <Form
                initialValues={{ selectValue: '6', otherField: '' }}
                onSubmit={action('onSubmit')}
                validationSchema={Yup.object().shape({
                    selectValue: Yup.string().required('Required field'),
                })}
            >
                <FormFieldWrapper name="selectValue" label="Select content" required>
                    <Select {...args} css={{ minWidth: 200 }} />
                </FormFieldWrapper>
                <br />
                <FormField
                    name="otherField"
                    placeholder="There are no re-render lags when entering this field"
                    size="md"
                />

                <br />
                <Button type="submit" style={{ marginRight: scale(2) }}>
                    Submit
                </Button>
                <FormReset type="reset" theme="secondary">
                    Reset
                </FormReset>
            </Form>
        </div>
    ),
};
