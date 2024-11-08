import type { Meta, StoryObj } from '@storybook/react';

import { ComponentProps, useState } from 'react';

import README from '../README.md';
import { Mask } from './index';

/** Телефонный номер (+7(000) 000-00-00) */
const maskPhone = '+7(000) 000-00-00';

export default {
    title: 'Controls/ Form / Mask',
    component: Mask,
    args: { placeholderChar: '_', lazy: false, mask: maskPhone },
    argTypes: { placeholderChar: { control: 'text' }, lazy: { control: 'boolean' } },
    parameters: {
        docs: {
            description: {
                component: README,
            },
        },
    },
} as Meta<typeof Mask>;

export const Basic: StoryObj<ComponentProps<typeof Mask>> = {
    args: {},
    render: args => {
        const [value, setValue] = useState('');

        return (
            <Mask
                {...args}
                field={{
                    value,
                    onChange(event) {
                        setValue(event.target.value);
                    },
                }}
            />
        );
    },
};
