import { Button, ErrorMessages, defaultTheme, scale } from '@ensi-platform/core-components-common';
import { Form, FormFieldWrapper, FormReset } from '@ensi-platform/core-components-form';
import { FormMessage } from '@ensi-platform/core-components-form-control';

import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';

import * as Yup from 'yup';
import { type ComponentProps, useState } from 'react';
import { useController } from 'react-hook-form';

import README from '../README.md';
import { Checkbox, FormCheckbox } from './index';

const { typography } = defaultTheme;

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

const CheckboxGroup = () => {
    const { fieldState } = useController({ name: 'checkboxGroup' });
    const error = Array.isArray(fieldState.error) ? fieldState.error[0] : fieldState.error;

    const options = [
        { value: '1', label: 'Checkbox group 1' },
        { value: '2', label: 'Checkbox group 2' },
        { value: '3', label: 'Checkbox group 3' },
        { value: '4', label: 'Checkbox group 4' },
    ];

    return (
        <fieldset>
            <legend css={{ ...typography('bodySmBold'), marginBottom: scale(1) }}>Checkbox group</legend>

            {error?.message && <FormMessage css={{ marginBottom: scale(1) }} message={error.message} />}

            {options.map(option => (
                <FormFieldWrapper name="checkboxGroup" value={option.value} key={option.value}>
                    <FormCheckbox hideError>{option.label}</FormCheckbox>
                </FormFieldWrapper>
            ))}
        </fieldset>
    );
};

export const WithForm: StoryObj<ComponentProps<typeof Checkbox>> = {
    render: () => (
        <Form
            initialValues={{
                checkbox: null,
                checkboxGroup: [],
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

            <CheckboxGroup />

            <br />
            <Button type="submit" style={{ marginRight: scale(2) }}>
                Submit
            </Button>
            <FormReset theme="secondary">Reset</FormReset>
        </Form>
    ),
};
