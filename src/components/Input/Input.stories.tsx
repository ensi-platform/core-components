/* eslint-disable react-hooks/rules-of-hooks */
import type { Meta, StoryObj } from '@storybook/react';
import { ComponentProps } from 'react';

import { formControlThemes } from '@components/FormControl/themes';
import { FormControlSize } from '@components/FormControl/types';

import ProfileIcon from '@icons/small/user.svg';

import Input from './index';

export default {
    title: 'Components / Input',
    component: Input,
    parameters: {
        docs: {
            description: {
                // component: README,
            },
        },
        backgrounds: {
            default: 'grey100',
        },
        nextRouter: { query: { page: 2, filter: 'food' } },
    },
} as Meta<typeof Input>;

export const Basic: StoryObj<
    ComponentProps<typeof Input> & {
        withIcon: boolean;
    }
> = {
    args: {
        type: 'text',
        block: false,
        size: 'md',
        variant: 'primary',
        theme: 'basic',
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
        theme: {
            options: Object.keys(formControlThemes),
            control: { type: 'radio' },
        },
        size: {
            options: Object.values(FormControlSize),
            control: { type: 'radio' },
        },
    },
    render: ({ withIcon, ...args }) => (
        <Input id="example-input" rightAddons={withIcon ? <ProfileIcon /> : null} {...args} />
    ),
};
