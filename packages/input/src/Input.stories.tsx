import { Button, ErrorMessages, IconSmallUser as ProfileIcon } from '@ensi-platform/core-components-common';
import { Form, FormFieldWrapper, FormReset } from '@ensi-platform/core-components-form';
import { FormControlSize } from '@ensi-platform/core-components-form-control';

import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';

import * as Yup from 'yup';
import type { ComponentProps } from 'react';

import README from '../README.md';
import { Input } from './index';

export default {
    title: 'Components / Input',
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

export const WithForm: StoryObj<ComponentProps<typeof Input>> = {
    args: {},
    render: args => (
        <div style={{ width: 500, minHeight: 800 }}>
            <Form
                initialValues={{ selectValue: null, otherField: '' }}
                onSubmit={action('onSubmit')}
                validationSchema={Yup.object().shape({
                    text: Yup.string().min(5, ErrorMessages.MIN_SYMBOLS(3)).required(ErrorMessages.REQUIRED),
                })}
            >
                <FormFieldWrapper name="text" label="Введите текст" required>
                    <Input id="example-input" {...args} />
                </FormFieldWrapper>
                <br />
                <Button type="submit">Отправить</Button>
                <FormReset theme="secondary">Сбросить</FormReset>
            </Form>
        </div>
    ),
};
