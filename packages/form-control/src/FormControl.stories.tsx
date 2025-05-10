import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';

import type { ComponentProps } from 'react';

import README from '../README.md';
import { FormControl } from './index';
import { FormControlSize } from './types';

export default {
    title: 'Components / FormControl',
    component: FormControl,
    parameters: {
        docs: {
            description: {
                component: README,
            },
        },
    },
    args: {
        errorPlacement: 'above',
        label: 'Example text',
        focused: false,
        disabled: false,
        readOnly: false,
        filled: false,
        error: 'Error',
        hint: 'Example text',
        size: 'md',
    },
    argTypes: {
        errorPlacement: {
            options: ['above', 'under'],
            control: { type: 'radio' },
        },
        size: {
            options: Object.values(FormControlSize),
            control: { type: 'radio' },
        },
    },
} as Meta<typeof FormControl>;

export const Basic: StoryObj<Omit<ComponentProps<typeof FormControl>, 'theme'>> = {
    render: args => (
        <FormControl
            rightAddons={<p>R</p>}
            leftAddons={<p>L</p>}
            bottomAddons={<p>Bottom addons</p>}
            onClick={action('click on field')}
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
