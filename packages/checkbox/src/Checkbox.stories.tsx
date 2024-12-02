import { Button, ErrorMessages } from '@ensi-platform/core-components-common';
import { Form, FormFieldWrapper } from '@ensi-platform/core-components-form';

import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';

import * as Yup from 'yup';
import { type ComponentProps, useState } from 'react';

import README from '../README.md';
import { Checkbox, FormCheckbox } from './index';

const defaultProps: ComponentProps<typeof Checkbox> = {
    onChange: action('onChange'),
};

export default {
    title: 'Components / Checkbox',
    component: Checkbox,
    parameters: {
        docs: {
            description: {
                component: README,
            },
        },
    },
    argTypes: {
        checked: {
            table: {
                type: { summary: 'boolean' },
            },
            description: 'Manage checkbox checked state (native prop)',
            control: {
                type: 'boolean',
            },
        },

        indeterminate: {
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: false },
            },
            description: 'Manage checkbox indeterminate state',
            control: {
                type: 'boolean',
            },
        },

        align: {
            table: {
                defaultValue: { summary: 'start' },
                type: { summary: 'start | center' },
            },
            description: 'Checkbox vertical alignment relative to its label',
            control: 'radio',
            options: ['start', 'center'],
        },

        block: {
            table: {
                type: { summary: 'boolean' },
            },
            description: 'Use 100% of parent width',
            control: {
                type: 'boolean',
            },
        },

        focused: {
            table: {
                type: { summary: 'boolean' },
            },
            description: 'Manage focus(element select) state',
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

        hint: {
            table: {
                type: { summary: 'string' },
            },
            description: 'Field hint',
            control: {
                type: 'text',
            },
        },

        error: {
            table: {
                type: { summary: 'string' },
            },
            description: 'Field error',
            control: {
                type: 'text',
            },
        },
    },
} as Meta<typeof Checkbox>;

export const Basic: StoryObj<ComponentProps<typeof Checkbox>> = {
    args: defaultProps,
    render: ({ checked: initialChecked, onChange, ...args }) => {
        const [checked, setChecked] = useState(initialChecked);

        return (
            <Checkbox
                {...args}
                checked={checked}
                onChange={event => {
                    setChecked(event.currentTarget.checked);
                    onChange?.(event);
                }}
            >
                Вариант 1
            </Checkbox>
        );
    },
};

export const WithLink: StoryObj<ComponentProps<typeof Checkbox>> = {
    args: defaultProps,
    render: ({ checked: initialChecked, onChange, ...args }) => {
        const [checked, setChecked] = useState(initialChecked);

        return (
            <div css={{ width: '300px' }}>
                <Checkbox
                    {...args}
                    checked={checked}
                    onChange={event => {
                        setChecked(event.currentTarget.checked);
                        onChange?.(event);
                    }}
                >
                    Я прочитал и принимаю{' '}
                    <a href="/" style={{ textDecoration: 'underline' }}>
                        Пользовательское соглашение
                    </a>{' '}
                    и{' '}
                    <a href="/" style={{ textDecoration: 'underline' }}>
                        Согласие на обработку персональных данных
                    </a>
                </Checkbox>
            </div>
        );
    },
};

export const WithForm: StoryObj<ComponentProps<typeof Checkbox>> = {
    render: () => (
        <Form
            initialValues={{
                checkbox: false,
                checkboxGroup: ['2'],
            }}
            validationSchema={Yup.object().shape({
                checkbox: Yup.boolean().required(ErrorMessages.REQUIRED),
                checkboxGroup: Yup.array().min(1, ErrorMessages.REQUIRED).required(ErrorMessages.REQUIRED),
            })}
            onSubmit={action('submit')}
        >
            <FormFieldWrapper name="checkbox">
                <FormCheckbox>Checkbox solo</FormCheckbox>
            </FormFieldWrapper>
            <br />

            {/* <FormFieldWrapper name="checkboxGroup">
                <FormControlGroup>
                    <FormCheckbox value="1">Checkbox group 1</FormCheckbox>
                    <FormCheckbox value="2">Checkbox group 2</FormCheckbox>
                    <FormCheckbox value="3">Checkbox group 3</FormCheckbox>
                </FormControlGroup>
            </FormFieldWrapper> */}
            <br />
            <Button type="submit" size="sm">
                Submit
            </Button>
        </Form>
    ),
};
