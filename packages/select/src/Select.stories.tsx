import type { StoryObj } from '@storybook/react';

import { ComponentProps, useMemo, useState } from 'react';

import { Button, scale } from '@greensight/gds';

import { Select, SelectItem } from '.';
import README from '../README.md';

export default {
    title: 'Components / Select',
    component: Select,
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
                                return selectedValues?.includes(e.value?.toString());
                            }
                            return selectedValues?.includes(e.value?.toString());
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
                <Select
                    {...args}
                    name="name"
                    onChange={(e, payload) => {
                        if (!args.multiple && payload.actionItem?.value) {
                            setValue([payload.actionItem.value.toString()]);
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
                    placeholder="Выберите"
                />
                <Button css={{ marginTop: scale(1) }} onClick={() => setOpen(!open)}>
                    {!open ? 'Открыть' : 'Закрыть'} вручную
                </Button>
            </div>
        );
    },
};
