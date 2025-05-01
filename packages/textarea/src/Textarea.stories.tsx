import { Button, ErrorMessages, scale } from '@ensi-platform/core-components-common';
import { Form, FormReset } from '@ensi-platform/core-components-form';

import { action } from '@storybook/addon-actions';
import type { StoryObj } from '@storybook/react';

import * as Yup from 'yup';
import { type ComponentProps, useState } from 'react';

import README from '../README.md';
import { FormTextareaField, Textarea } from './index';

export default {
    title: 'Components / TextArea',
    component: () => Textarea,
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

type Args = ComponentProps<typeof Textarea> & {};

export const Basic: StoryObj<Args> = {
    args: {
        size: 'md',
        disabled: false,
        error: '',
        hint: '',
        label: 'Оставьте комментарий',
        readOnly: false,
        minRows: 3,
        maxRows: 8,
        maxLength: 20,
        isResize: false,
    },
    argTypes: {
        minRows: { control: 'range' },
        maxRows: { control: 'range' },
    },
    render: args => {
        const [value, setValue] = useState('');
        return <Textarea {...args} value={value} onInput={e => setValue(e.currentTarget.value)} />;
    },
};

export const WithForm: StoryObj<ComponentProps<typeof Textarea>> = {
    render: args => (
        <div style={{ width: 500, minHeight: 800 }}>
            <Form
                initialValues={{ text: 'Default value' }}
                validationSchema={Yup.object().shape({
                    text: Yup.string().min(5, ErrorMessages.MIN_SYMBOLS(5)).required(ErrorMessages.REQUIRED),
                })}
                onSubmit={action('onSubmit')}
            >
                <FormTextareaField name="text" label="Enter some text" {...args} />
                <br />
                <Button type="submit" style={{ marginRight: scale(2) }}>
                    Submit
                </Button>
                <FormReset theme="secondary">Reset</FormReset>
            </Form>
        </div>
    ),
};
