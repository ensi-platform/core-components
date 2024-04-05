import type { Meta, StoryObj } from '@storybook/react';
import type { ComponentProps } from 'react';

import { FormControlSize } from '@greensight/core-components-form-control';
import { IconSmallUser as ProfileIcon } from '@greensight/core-components-common';

import README from '../README.md';
import Input from './index';

export default {
    title: 'Controls / Input',
    component: Input,
    parameters: {
        docs: {
            description: {
                component: README,
            },
        },
    },
    args: {
        type: 'text',
        block: false,
        size: 'md',
        variant: 'primary',
        clear: false,
        disabled: false,
        error: '',
        hint: '',
        label: 'Логин',
        labelWrap: true,
        defaultValue: 'login@mail.ru',
        readOnly: false,
        placeholder: 'Введите логин',
        withIcon: true,
    },
    argTypes: {
        size: {
            options: Object.values(FormControlSize),
            control: { type: 'radio' },
        },
    },
} as Meta<typeof Input>;

export const Basic: StoryObj<ComponentProps<typeof Input> & { withIcon: boolean }> = {
    args: {},
    render: ({ withIcon, ...args }) => (
        <Input id="example-input" rightAddons={withIcon ? <ProfileIcon /> : null} {...args} />
    ),
};
