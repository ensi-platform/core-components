import type { Meta, StoryObj } from '@storybook/react';

import { type ComponentProps, useState } from 'react';

import README from '../README.md';
import { Password } from './index';

export default {
    title: 'Controls / Form / Password',
    component: Password,
    parameters: {
        docs: {
            description: {
                component: README,
            },
        },
    },
} as Meta<typeof Password>;

export const Basic: StoryObj<ComponentProps<typeof Password>> = {
    render: args => {
        const [value, setValue] = useState('');

        return (
            <Password
                {...args}
                field={{
                    value,
                    onChange: event => {
                        setValue(event.target.value);
                    },
                }}
            />
        );
    },
};
