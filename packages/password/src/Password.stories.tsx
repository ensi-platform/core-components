import { Button, regOneDigit, regOneLetter, scale } from '@ensi-platform/core-components-common';
import { Form, FormReset } from '@ensi-platform/core-components-form';

import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';

import * as Yup from 'yup';
import { type ComponentProps, useState } from 'react';

import README from '../README.md';
import { FormPasswordField, Password } from './index';

export default {
    title: 'Components / Password',
    component: Password,
    parameters: {
        docs: {
            description: {
                component: README,
            },
        },
    },
} as Meta<typeof Password>;

export const Basic: StoryObj<ComponentProps<typeof Password>> = {
    render: args => {
        const [value, setValue] = useState('');

        return <Password {...args} value={value} onChange={e => setValue(e.target.value)} />;
    },
};

export const WithForm: StoryObj<ComponentProps<typeof Password>> = {
    args: {},
    render: args => (
        <div style={{ width: 500, minHeight: 800 }}>
            <Form
                initialValues={{ password: 'qwerty123' }}
                validationSchema={Yup.object().shape({
                    password: Yup.string()
                        .matches(regOneLetter, 'Password must contain at least one latin letter')
                        .matches(regOneDigit, 'The password must contain at least one digit')
                        .min(8, 'The password must be at least 8 characters long')
                        .required('Required field'),
                })}
                onSubmit={action('onSubmit')}
            >
                <FormPasswordField name="password" label="Пароль" {...args} />
                <br />
                <Button type="submit" style={{ marginRight: scale(2) }}>
                    Submit
                </Button>
                <FormReset theme="secondary">Reset</FormReset>
            </Form>
        </div>
    ),
};
