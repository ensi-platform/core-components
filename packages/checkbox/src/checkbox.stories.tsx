/* eslint-disable react-hooks/rules-of-hooks */
import type { Meta, StoryObj } from '@storybook/react';
import { useState, ComponentProps } from 'react';

import README from '../README.md';
import { Checkbox } from './index';

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
                value="first"
                checked={checked}
                onChange={event => {
                    setChecked(event.target.checked);
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
                name="checkboxLink"
                checked={checked}
                onChange={event => {
                    setChecked(event.target.checked);
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
