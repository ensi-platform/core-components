import type { ComponentProps } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { scale } from '@greensight/core-components-common';
import README from '../README.md';
import Loader from './index';

export default {
    title: 'Controls / Loader',
    name: 'Loader',
    component: Loader,
    parameters: {
        docs: {
            description: {
                component: README,
            },
        },
    },
    argTypes: {
        message: {
            table: {
                type: { summary: 'string' },
            },
            description:
                'The message is located under the loader spinner<br />If **message** is defined, backdrop opacity will be 0.8<br />If **message** is undefined, backdrop opacity will be 0.56',
            defaultValue: {
                summary: '',
            },
            control: { type: 'text' },
            // summary: 'string',
        },
        variant: {
            table: {
                type: { summary: 'string' },
            },
            options: ['primary'],
            defaultValue: {
                summary: 'primary',
            },
            control: { type: 'select' },
            summary: 'string',
        },
        size: {
            table: {
                type: { summary: 'string' },
            },
            options: ['md'],
            defaultValue: {
                summary: 'md',
            },
            control: { type: 'select' },
            summary: 'string',
        },
    },
} as Meta<typeof Loader>;

export const Basic: StoryObj<ComponentProps<typeof Loader>> = {
    args: {},
    render: args => (
        <div style={{ height: `${scale(12)}px` }}>
            <Loader {...args} />
        </div>
    ),
};

export const WithMessage: StoryObj<ComponentProps<typeof Loader>> = {
    name: 'With message',
    args: { message: 'Loading . . .' },
    render: args => (
        <div style={{ height: `${scale(12)}px` }}>
            <Loader {...args} />
        </div>
    ),
};
