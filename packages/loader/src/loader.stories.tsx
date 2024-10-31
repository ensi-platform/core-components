import type { ComponentProps } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { scale } from '@greensight/core-components-common';
import README from '../README.md';
import { emptyCSS, Loader, LoaderSizes, LoaderVariants } from './index';

export default {
    title: 'Controls / Loader',
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
        },
        wrapperStyles: {
            table: {
                type: { summary: 'object' },
            },
            description: 'Additional wrapper styles.',
            summary: 'object',
        },
        containerStyles: {
            table: {
                type: { summary: 'object' },
            },
            description: 'Additional container styles.',
            summary: 'object',
        },
        spinnerStyles: {
            table: {
                type: { summary: 'object' },
            },
            description: 'Additional spinner styles.<br />Use `::after` to style the spinner.',
            summary: 'object',
        },
        messageStyles: {
            table: {
                type: { summary: 'object' },
            },
            description: 'Additional message styles.',
            summary: 'object',
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

const defaultProps: ComponentProps<typeof Loader> = {
    message: '',
    wrapperStyles: emptyCSS,
    containerStyles: emptyCSS,
    spinnerStyles: emptyCSS,
    messageStyles: emptyCSS,
    variant: LoaderVariants.primary,
    size: LoaderSizes.md,
};

export const Basic: StoryObj<ComponentProps<typeof Loader>> = {
    args: { ...defaultProps },
    render: args => (
        <div css={{ height: `${scale(12)}px` }}>
            <Loader {...args} />
        </div>
    ),
};

export const WithMessage: StoryObj<ComponentProps<typeof Loader>> = {
    name: 'With message',
    args: { ...defaultProps, message: 'Loading . . .' },
    render: args => (
        <div css={{ height: `${scale(12)}px` }}>
            <Loader {...args} />
        </div>
    ),
};
