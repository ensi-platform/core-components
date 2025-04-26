import { Button, ErrorMessages, regPhone, scale } from '@ensi-platform/core-components-common';
import { Form, FormReset } from '@ensi-platform/core-components-form';

import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';

import * as Yup from 'yup';
import { type ComponentProps, useState } from 'react';

import README from '../README.md';
import { FormComponent as FormMaskField, Component as Mask } from './index';

/** Телефонный номер (+7(000) 000-00-00) */
const maskPhone = '+7(000) 000-00-00';

export default {
    title: 'Components / Mask',
    component: Mask,
    args: { opts: { placeholderChar: '_', lazy: false, mask: maskPhone } },
    argTypes: { placeholderChar: { control: 'text' }, lazy: { control: 'boolean' } },
    parameters: {
        docs: {
            description: {
                component: README,
            },
        },
    },
} as Meta<typeof Mask>;

export const Basic: StoryObj<ComponentProps<typeof Mask>> = {
    args: {},
    render: args => {
        const [value, setValue] = useState('');

        return <Mask {...args} value={value} onInput={e => setValue(e.target.value)} />;
    },
};

export const WithForm: StoryObj<ComponentProps<typeof Mask>> = {
    args: {},
    render: args => (
        <Form
            initialValues={{ phone: '+7(999) 888-77-66' }}
            validationSchema={Yup.object().shape({
                phone: Yup.string().matches(regPhone, 'Check phone').required(ErrorMessages.REQUIRED),
            })}
            onSubmit={action('onSubmit')}
        >
            <FormMaskField name="phone" {...args} />

            <br />
            <Button type="submit" style={{ marginRight: scale(2) }}>
                Submit
            </Button>
            <FormReset theme="secondary">Reset</FormReset>
        </Form>
    ),
};
