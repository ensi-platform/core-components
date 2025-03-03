import { Button, ErrorMessages, regPhone, scale } from '@ensi-platform/core-components-common';
import { Form, FormFieldWrapper, FormReset } from '@ensi-platform/core-components-form';

import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';

import * as Yup from 'yup';
import { type ComponentProps, useState } from 'react';

import README from '../README.md';
import { Mask } from './index';

/** Телефонный номер (+7(000) 000-00-00) */
const maskPhone = '+7(000) 000-00-00';

export default {
    title: 'Components / Mask',
    component: Mask,
    args: { placeholderChar: '_', lazy: false, mask: maskPhone },
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

        return (
            <Mask
                {...args}
                field={{
                    value,
                    onChange(event) {
                        setValue(event.target.value);
                    },
                }}
            />
        );
    },
};

export const WithForm: StoryObj<ComponentProps<typeof Mask>> = {
    args: {},
    render: args => (
        <div style={{ width: 500, minHeight: 800 }}>
            <Form
                initialValues={{ phone: '+7(999) 888-77-66' }}
                validationSchema={Yup.object().shape({
                    phone: Yup.string().matches(regPhone, 'Check phone').required(ErrorMessages.REQUIRED),
                })}
                onSubmit={action('onSubmit')}
            >
                <FormFieldWrapper name="phone" label="Phone">
                    <Mask {...args} />
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
