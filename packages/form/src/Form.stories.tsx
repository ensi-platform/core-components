import { Button, Layout } from '@greensight/gds';
import type { Meta, StoryObj } from '@storybook/react';

import type { ComponentProps } from 'react';

import { Form, FormField, FormReset, TypedField } from '.';
import README from '../README.md';

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
    argTypes: {},
} as Meta<typeof Form>;

const defaultProps: ComponentProps<typeof Form> = {
    initialValues: {
        field: '',
        typedField: '',
    },
};

export const Basic: StoryObj<ComponentProps<typeof Form> & { withIcon: boolean }> = {
    args: { ...defaultProps },
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
