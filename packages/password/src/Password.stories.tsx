import { Button, ErrorMessages, regOneDigit, regOneLetter, scale } from '@ensi-platform/core-components-common';
import { Form, FormFieldWrapper, FormReset } from '@ensi-platform/core-components-form';

import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';

import * as Yup from 'yup';
import { type ComponentProps, useState } from 'react';

import README from '../README.md';
import { Password } from './index';

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

        return (
            <Password
                {...args}
                field={{
                    value,
                    onChange: event => {
                        setValue(event.target.value);
                    },
                }}
            />
        );
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
                        .matches(regOneLetter, 'Пароль должен содержать хотя бы 1 латинскую букву')
                        .matches(regOneDigit, 'Пароль должен содержать хотя бы 1 цифру')
                        .min(8, 'Пароль должен быть не менее 8 символов')
                        .required(ErrorMessages.REQUIRED),
                })}
                onSubmit={action('onSubmit')}
            >
                <FormFieldWrapper name="password" label="Пароль">
                    <Password {...args} />
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
