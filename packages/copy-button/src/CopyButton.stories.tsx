import { ComponentProps } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { LinkColorType } from '@greensight/core-components-common';
import README from '../README.md';
import { CopyButton } from './index';

export default {
    title: 'Components / CopyButton',
    component: CopyButton,
    parameters: {
        docs: {
            description: {
                component: README,
            },
        },
    },
} as Meta<typeof CopyButton>;

export const Basic: StoryObj<ComponentProps<typeof CopyButton>> = {
    args: {
        children: 'Press me',
        timeout: 1000,
        linkStyle: 'blue' as LinkColorType,
    },

    argTypes: {
        children: {
            description: 'The text content that can be copied',
            table: {
                defaultValue: { summary: '' },
                type: { summary: 'string' },
            },
            type: { name: 'string', required: true },
        },
        timeout: {
            description: 'The duration of the success check mark display',
            table: {
                defaultValue: { summary: 1000 },
                type: { summary: 'number' },
            },
        },
        linkStyle: {
            description: 'Link color type',
            table: {
                defaultValue: { summary: 'blue' },
                type: { summary: 'blue | black | grey | red' },
            },
            options: ['blue', 'black', 'grey', 'red'],
            control: { type: 'radio' },
        },
    },
    render: args => <CopyButton {...args} />,
};
