import { Button, IconSmallUser as ProfileIcon, scale } from '@ensi-platform/core-components-common';
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
        label: 'Login',
        labelWrap: true,
        defaultValue: 'login@mail.ru',
        readOnly: false,
        placeholder: 'Enter login',
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
                initialValues={{ text: 'Default value' }}
                validationSchema={Yup.object().shape({
                    text: Yup.string().min(5, 'Minimum 5 symbols').required('Required field'),
                })}
                onSubmit={action('onSubmit')}
            >
                <FormFieldWrapper name="text" label="Enter some text">
                    <Input id="example-input" {...args} />
                </FormFieldWrapper>
                <br />
                <Button type="submit" style={{ marginRight: scale(2) }}>
                    Submit
                </Button>
                <FormReset theme="secondary">Reset</FormReset>
            </Form>
        </div>
    ),
};
