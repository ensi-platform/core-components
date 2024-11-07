import { Form, FormFieldWrapper } from '@ensi-platform/core-components-form';

import { Button } from '@greensight/gds';
import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';

import { type ComponentProps, useState } from 'react';

import README from '../README.md';
import { Checkbox, FormCheckbox } from './index';

export default {
    title: 'Controls / Form / Checkbox',
    component: Checkbox,
    parameters: {
        docs: {
            description: {
                component: README,
            },
        },
    },
} as Meta<typeof Checkbox>;

export const Basic: StoryObj<ComponentProps<typeof Checkbox>> = {
    render: () => {
        const [checked, setChecked] = useState(false);

        return (
            <Checkbox
                checked={checked}
                onChange={event => {
                    setChecked(event.currentTarget.checked);
                }}
            >
                Вариант 1
            </Checkbox>
        );
    },
};

export const WithLink: StoryObj<ComponentProps<typeof Checkbox>> = {
    render: () => {
        const [checked, setChecked] = useState(false);

        return (
            <Checkbox
                checked={checked}
                onChange={event => {
                    setChecked(event.currentTarget.checked);
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
            onSubmit={action('submit')}
        >
            <FormFieldWrapper name="checkbox">
                <FormCheckbox>Checkbox solo</FormCheckbox>
            </FormFieldWrapper>
            <br />

            <FormFieldWrapper name="checkboxGroup">
                <FormCheckbox value="1">Checkbox group 1</FormCheckbox>
            </FormFieldWrapper>
            <FormFieldWrapper name="checkboxGroup">
                <FormCheckbox value="2">Checkbox group 2</FormCheckbox>
            </FormFieldWrapper>
            <FormFieldWrapper name="checkboxGroup">
                <FormCheckbox value="3">Checkbox group 3</FormCheckbox>
            </FormFieldWrapper>
            <br />
            <Button type="submit" size="sm">
                Submit
            </Button>
        </Form>
    ),
};
