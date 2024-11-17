import { Button, Layout } from '@greensight/gds';
import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';

import type { ComponentProps } from 'react';

import { Form, FormField, FormReset, TypedField } from '.';
import README from '../README.md';

const defaultProps: ComponentProps<typeof Form> = {
    initialValues: {
        field: '',
        typedField: '',
    },
    onSubmit: action('onSubmit'),
    onReset: action('onReset'),
    onChange: action('onChange'),
};

export default {
    title: 'Controls / Form / Form',
    component: Form,
    parameters: {
        docs: {
            description: {
                component: README,
            },
        },
    },
    argTypes: {
        initialValues: {
            table: {
                type: { summary: 'DefaultValues (type from RHF)' },
            },
            description: 'Initial values for form fields.',
            type: { name: 'other', value: 'DefaultValues (from RHF)', required: true },
            summary: 'object',
        },

        validationSchema: {
            table: {
                type: { summary: 'AnyObjectSchema (type from yup)' },
            },
            description: 'Yup validation schema for form fields.',
            summary: 'object',
        },

        children: {
            table: {
                type: { summary: 'ReactNode  |  (props: UseFormReturn) => ReactNode' },
            },
            description: 'Form content.',
            summary: 'object',
        },

        mode: {
            table: {
                defaultValue: { summary: 'all' },
                type: { summary: 'all | onSubmit | onBlur | onChange | onTouched' },
            },
            description:
                "[RHF's prop](https://react-hook-form.com/docs/useform#mode) responsible for validation strategy",
            control: 'select',
            options: ['all', 'onSubmit', 'onBlur', 'onChange', 'onTouched'],
        },

        enableReinitialize: {
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: false },
            },
            description: 'Enable reinitialize on initialValues change.',
            control: {
                type: 'boolean',
            },
        },

        validateOnChange: {
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: false },
            },
            description: 'Enable validate on change.',
            control: {
                type: 'boolean',
            },
        },

        validateOnBlur: {
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: false },
            },
            description: 'Enable validate on blur.',
            control: {
                type: 'boolean',
            },
        },

        isForm: {
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: false },
            },
            description: 'Whether to render form tag',
            control: {
                type: 'boolean',
            },
        },

        disabled: {
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: false },
            },
            description: 'Flag responsible for disabling form',
            control: {
                type: 'boolean',
            },
        },

        onSubmit: {
            table: {
                type: { summary: 'function' },
            },
            description: 'Form submit handler',
        },

        onReset: {
            table: {
                type: { summary: 'function' },
            },
            description: 'Form reset handler',
        },

        onChange: {
            table: {
                type: { summary: 'function' },
            },
            description: 'Form change handler',
        },
    },
    args: { ...defaultProps },
} as Meta<typeof Form>;

export const Basic: StoryObj<ComponentProps<typeof Form> & { withIcon: boolean }> = {
    args: { ...defaultProps },
    render: ({ ...args }) => (
        <Form {...args}>
            <FormField label="Обычное поле" name="field" clear />
            <br />
            <TypedField label="Поле с числами" name="typedField" clear />

            <br />

            <Layout cols={['min-content', 'min-content']}>
                <Button type="submit">Submit</Button>
                <FormReset type="submit">Reset</FormReset>
            </Layout>
        </Form>
    ),
};
