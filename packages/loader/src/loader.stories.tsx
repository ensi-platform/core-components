import { emptyCSS, scale } from '@ensi-platform/core-components-common';

import type { Meta, StoryObj } from '@storybook/react';

import type { ComponentProps } from 'react';

import README from '../README.md';
import { Loader, LoaderSizes, LoaderVariants } from './index';

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
        wrapperCSS: {
            table: {
                type: { summary: 'object' },
            },
            description: 'Additional wrapper styles.',
            summary: 'object',
        },
        containerCSS: {
            table: {
                type: { summary: 'object' },
            },
            description: 'Additional container styles.',
            summary: 'object',
        },
        spinnerCSS: {
            table: {
                type: { summary: 'object' },
            },
            description: 'Additional spinner styles.<br />Use `::after` to style the spinner.',
            summary: 'object',
        },
        messageCSS: {
            table: {
                type: { summary: 'object' },
            },
            description: 'Additional message styles.',
            summary: 'object',
        },
        className: {
            table: {
                type: { summary: 'string' },
            },
            description: 'Additional wrapper styles.<br />Has a higher priority than `wrapperCSS` prop.',
            summary: 'string',
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
    wrapperCSS: emptyCSS,
    containerCSS: emptyCSS,
    spinnerCSS: emptyCSS,
    messageCSS: emptyCSS,
    className: '',
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
