import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';

import type { ComponentProps } from 'react';

import README from '../README.md';
import { Component } from './index';
import { FormControlSizeEnum } from './types';

export default {
    title: 'Components / FormControl',
    component: Component,
    parameters: {
        docs: {
            description: {
                component: README,
            },
        },
    },
    args: {
        label: 'Пример текста',
        focused: false,
        disabled: false,
        readOnly: false,
        filled: false,
        error: '',
        hint: 'Подсказка',
        size: 'md',
    },
    argTypes: {
        size: {
            options: Object.values(FormControlSizeEnum),
            control: { type: 'radio' },
        },
    },
} as Meta<typeof Component>;

export const Basic: StoryObj<Omit<ComponentProps<typeof Component>, 'theme'>> = {
    render: args => (
        <Component
            rightAddons={<p>R</p>}
            leftAddons={<p>L</p>}
            bottomAddons={<p>Bottom addons</p>}
            onClick={action('click on field')}
            {...args}
        >
            <div
                className="control"
                style={{ height: '100%', color: 'green', display: 'flex', alignItems: 'center', padding: '0 8px' }}
            >
                UI element
            </div>
        </Component>
    ),
};
