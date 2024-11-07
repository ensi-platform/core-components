import { Button, Layout } from '@greensight/gds';
import type { Meta, StoryObj } from '@storybook/react';

import type { ComponentProps } from 'react';

import { Form, FormField, FormReset, TypedField } from '.';
import README from '../README.md';

export default {
    title: 'Controls / Form / index',
    component: Form,
    parameters: {
        docs: {
            description: {
                component: README,
            },
        },
    },

    args: {
        isForm: true,
    },
    argTypes: {
        isForm: {
            control: 'boolean',
        },
    },
} as Meta<typeof Form>;

export const Basic: StoryObj<ComponentProps<typeof Form> & { withIcon: boolean }> = {
    args: {},
    render: ({ ...args }) => (
        <Form
            {...args}
            initialValues={{
                field: '',
                typedField: '',
            }}
        >
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
