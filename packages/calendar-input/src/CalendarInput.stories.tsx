import { Button, scale } from '@ensi-platform/core-components-common';
import { Form, FormFieldWrapper, FormReset } from '@ensi-platform/core-components-form';

import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';

import * as Yup from 'yup';
import { type ComponentProps, useState } from 'react';

import README from '../README.md';
import { CalendarInput } from './index';

export default {
    title: 'Components / CalendarInput',
    component: CalendarInput,
    parameters: {
        docs: {
            description: {
                component: README,
            },
        },
    },
    args: {
        view: 'date',
        rangeBehavior: 'reset',
    },
    argTypes: {
        view: { options: ['date', 'date-time', 'time', 'date-range'], control: { type: 'radio' } },
        rangeBehavior: { options: ['clarification', 'reset'], control: { type: 'radio' } },
    },
} as Meta<typeof CalendarInput>;

export const Basic: StoryObj<ComponentProps<typeof CalendarInput> & { rangeBehavior: 'clarification' | 'reset' }> = {
    render: ({ view, rangeBehavior }) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [value, setValue] = useState<string>('');

        return (
            <div style={{ maxWidth: 450 }}>
                <CalendarInput
                    label="Date selection input"
                    platform="desktop"
                    view={view}
                    picker
                    {...({ rangeBehavior } as any)}
                    value={value}
                    onChange={(_, { value: newValue }) => {
                        setValue(newValue);
                    }}
                />
                <Button
                    type="button"
                    onClick={() => {
                        console.log('value', value);
                    }}
                >
                    Send
                </Button>
            </div>
        );
    },
};

export const WithForm: StoryObj<ComponentProps<typeof CalendarInput> & { rangeBehavior: 'clarification' | 'reset' }> = {
    render: () => (
        <Form
            initialValues={{ calendar: '12.12.2024' }}
            validationSchema={Yup.object().shape({
                calendar: Yup.string().required('Required field'),
            })}
            onSubmit={action('onSubmit')}
        >
            <FormFieldWrapper name="calendar">
                <CalendarInput
                    picker
                    placeholder="Date"
                    view="date"
                    platform="desktop"
                    label="Calendar input with default value"
                />
            </FormFieldWrapper>
            <br />
            <div style={{ display: 'flex' }}>
                <Button type="submit" style={{ marginRight: scale(2) }}>
                    Submit
                </Button>
                <FormReset theme="secondary">Reset</FormReset>
            </div>
        </Form>
    ),
};
