import { Button, scale } from '@ensi-platform/core-components-common';
import { Form, FormFieldWrapper, FormReset } from '@ensi-platform/core-components-form';

import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';

import * as Yup from 'yup';
import { type ComponentProps, useState } from 'react';

import README from '../README.md';
import { Counter } from './index';

export default {
    title: 'Components / Counter',
    component: Counter,
    args: {
        name: 'counter-knobs',
        label: 'Select the quantity of goods',
        min: 1,
        max: 999,
        step: 1,
        view: 'horizontal',
        rounded: false,
    },
    argTypes: {
        view: {
            options: ['vertical', 'horizontal'],
            control: {
                type: 'radio',
            },
        },
        step: {
            control: {
                type: 'range',
                min: 0,
                max: 999,
                step: 1,
            },
        },
        max: {
            control: {
                type: 'number',
                max: 999,
                min: 1,
            },
        },
        min: {
            control: {
                type: 'number',
                max: 999,
                min: 1,
            },
        },
    },
    parameters: {
        docs: {
            description: {
                component: README,
            },
        },
    },
} as Meta<typeof Counter>;

export const Basic: StoryObj<ComponentProps<typeof Counter>> = {
    render: args => <Counter {...args} />,
};

export const Controlled: StoryObj<ComponentProps<typeof Counter>> = {
    args: {},
    parameters: {
        docs: {
            description: {
                story: 'Using the counter without additional logic, i.e. all the logic for controlling the component is located inside the component.',
            },
        },
    },
    render: () => {
        const CounterExample = () => {
            const [value, setValue] = useState(1);
            return (
                <>
                    <Button css={{ marginRight: '12px' }} theme="secondary" onClick={() => setValue(5)}>
                        Set 5
                    </Button>
                    <Counter
                        name="counter-controlled"
                        label="Select the quantity of goods"
                        value={value}
                        onChange={newValue => setValue(newValue)}
                    />
                </>
            );
        };
        return <CounterExample />;
    },
};

export const Custom: StoryObj<ComponentProps<typeof Counter>> = {
    args: {
        name: 'custom',
        label: 'Specify the number of records',
        min: 2,
        max: 999,
        step: 2,
        value: 4,
    },
    parameters: {
        docs: {
            description: {
                story: 'Example of a counter with custom parameters.',
            },
        },
    },
    render: args => <Counter {...args} />,
};

export const Vertical: StoryObj<ComponentProps<typeof Counter>> = {
    args: {},
    parameters: {
        docs: {
            description: {
                story: 'Using a counter with a vertical display.',
            },
        },
    },
    render: () => <Counter name="counter-vertical" label="Select the quantity of goods" view="vertical" />,
};

export const WithForm: StoryObj<ComponentProps<typeof Counter>> = {
    render: () => (
        <Form
            initialValues={{ counter: 10 }}
            validationSchema={Yup.object().shape({
                counter: Yup.number().max(100).required('Required field'),
            })}
            onSubmit={action('onSubmit')}
        >
            <FormFieldWrapper name="counter">
                <Counter label="Quantity" />
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
