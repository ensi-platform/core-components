import { Button, ErrorMessages, scale } from '@ensi-platform/core-components-common';
import { Form, FormFieldWrapper, FormReset } from '@ensi-platform/core-components-form';

import { action } from '@storybook/addon-actions';
import type { StoryObj } from '@storybook/react';

import * as Yup from 'yup';
import type { ComponentProps } from 'react';

import README from '../README.md';
import { Textarea } from './index';

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
        type: 'text',
        size: 'md',
        disabled: false,
        error: '',
        hint: '',
        label: 'Оставьте комментарий',
        labelWrap: true,
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
    render: args => <Textarea {...args} />,
};

export const WithForm: StoryObj<ComponentProps<typeof Textarea>> = {
    render: args => (
        <div style={{ width: 500, minHeight: 800 }}>
            <Form
                initialValues={{ text: 'Default value' }}
                validationSchema={Yup.object().shape({
                    text: Yup.string().min(5, ErrorMessages.MIN_SYMBOLS(3)).required(ErrorMessages.REQUIRED),
                })}
                onSubmit={action('onSubmit')}
            >
                <FormFieldWrapper name="text" label="Enter some text">
                    <Textarea {...args} />
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
