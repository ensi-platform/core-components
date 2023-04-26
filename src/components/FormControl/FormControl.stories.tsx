/* eslint-disable react-hooks/rules-of-hooks */
import type { Meta, StoryObj } from '@storybook/react';
import { ComponentProps } from 'react';

import { formControlThemes } from '@components/FormControl/themes';
import { FormControlSize } from '@components/FormControl/types';

import FormControl from './index';

export default {
    title: 'Components / FormControl',
    component: FormControl,
    parameters: {
        docs: {
            description: {
                // component: README,
            },
        },
        backgrounds: {
            default: 'grey100',
        },
        nextRouter: { query: { page: 2, filter: 'food' } },
    },
} as Meta<typeof FormControl>;

export const Basic: StoryObj<ComponentProps<typeof FormControl>> = {
    args: {
        label: 'Пример текста',
        theme: 'basic',
        focused: false,
        disabled: false,
        readOnly: false,
        filled: false,
        error: 'Ошибка',
        hint: 'Подсказка',
        size: 'md',
    },
    argTypes: {
        theme: {
            options: Object.keys(formControlThemes),
            control: { type: 'radio' },
        },
        size: {
            options: Object.values(FormControlSize),
            control: { type: 'radio' },
        },
    },
    render: ({ theme, ...args }) => (
        <FormControl
            theme={formControlThemes[theme as keyof typeof formControlThemes]}
            rightAddons={<p>R</p>}
            leftAddons={<p>L</p>}
            bottomAddons={<p>Bottom addons</p>}
            onClick={console.log}
            fieldCSS={{
                ':hover': {
                    opacity: 0.5,
                },
            }}
            {...args}
        >
            <div
                className="control"
                style={{ height: '100%', color: 'green', display: 'flex', alignItems: 'center', padding: '0 8px' }}
            >
                I am a UI element
            </div>
        </FormControl>
    ),
};
