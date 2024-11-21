import { scale } from '@ensi-platform/core-components-common';

import type { Meta, StoryObj } from '@storybook/react';

import type { ComponentProps } from 'react';

import README from '../README.md';
import { LoadingSkeleton, LoadingSkeletonSizes, LoadingSkeletonVariants, emptyCSS } from './index';

export default {
    title: 'Controls / LoadingSkeleton',
    component: LoadingSkeleton,
    parameters: {
        docs: {
            description: {
                component: README,
            },
        },
    },
    argTypes: {
        variant: {
            table: {
                type: { summary: 'string' },
            },
            options: Object.values(LoadingSkeletonVariants),
            control: { type: 'select' },
            defaultValue: {
                summary: 'primary',
            },
            summary: 'string',
        },
        size: {
            table: {
                type: { summary: 'string' },
            },
            options: Object.values(LoadingSkeletonSizes),
            control: { type: 'select' },
            defaultValue: {
                summary: 'md',
            },
            summary: 'string',
        },
        count: {
            table: {
                type: { summary: 'number' },
            },
            description:
                'The number of lines of skeletons to render.<br />If count is a decimal number like 3.5, three full skeletons and one half-width skeleton will be rendered.',
            defaultValue: {
                summary: 1,
            },
            summary: 'number',
        },
        duration: {
            table: {
                type: { summary: 'number' },
            },
            description: 'The length of the animation in seconds.',
            defaultValue: {
                summary: 1.5,
            },
            summary: 'number',
        },
        verticalStep: {
            table: {
                type: { summary: 'number' },
            },
            description: 'Adds an indentation after each skeleton except the last one (px).',
            defaultValue: {
                summary: 0,
            },
            summary: 'number',
        },
        width: {
            table: {
                type: { summary: 'number | string' },
            },
            description:
                "The width of the skeleton.<br />It can be specified as either a number or a string with a unit, for example: `5`, `'5'`, `'5px'`<br />Default unit - `px`",
            defaultValue: {
                summary: "'100%'",
            },
            control: { type: 'text' },
            summary: 'string',
        },
        height: {
            table: {
                type: { summary: 'number | string' },
            },
            description:
                "The height of each skeleton line.<br />By default depends on `font-size`<br />It can be specified as either a number or a string with a unit, for example: `5`, `'5'`, `'5px'`<br />Default unit - `px`",
            defaultValue: {
                summary: 'font-size',
            },
            control: { type: 'text' },
            summary: ['string', 'number'],
        },
        skeletonWrapperCSS: {
            table: {
                type: { summary: 'object' },
            },
            description: 'Additional skeleton wrapper styles.',
            summary: 'object',
        },
        skeletonCSS: {
            table: {
                type: { summary: 'object' },
            },
            description: 'Additional skeleton styles.',
            summary: 'object',
        },
        className: {
            table: {
                type: { summary: 'string' },
            },
            description: 'Additional skeleton wrapper styles.',
            summary: 'string',
        },
        circle: {
            table: {
                type: { summary: 'boolean' },
            },
            required: false,
            description: 'Makes the skeleton circular by setting border-radius to 50%.',
            defaultValue: {
                summary: false,
            },
            summary: 'boolean',
        },
        reverseAnimationDirection: {
            table: {
                type: { summary: 'boolean' },
            },
            description:
                'The direction of the animation, either left-to-right or right-to-left.<br />Set `true` to get reverse animation direction.',
            defaultValue: {
                summary: false,
            },
            summary: 'boolean',
        },
        disableAnimation: {
            table: {
                type: { summary: 'boolean' },
            },
            description: 'Removes the animation of the skeleton.',
            defaultValue: {
                summary: false,
            },
            summary: 'boolean',
        },
    },
} as Meta<typeof LoadingSkeleton>;

const defaultProps: ComponentProps<typeof LoadingSkeleton> = {
    variant: 'primary',
    size: 'md',
    count: 1,
    duration: 1.5,
    verticalStep: 0,
    width: undefined,
    height: undefined,
    skeletonWrapperCSS: emptyCSS,
    skeletonCSS: emptyCSS,
    className: '',
    circle: false,
    reverseAnimationDirection: false,
    disableAnimation: false,
};

export const Basic: StoryObj<ComponentProps<typeof LoadingSkeleton>> = {
    args: {
        ...defaultProps,
    },
    render: args => (
        <div
            css={{
                height: scale(10),
            }}
        >
            <LoadingSkeleton {...args} />
        </div>
    ),
};

export const Sized: StoryObj<ComponentProps<typeof LoadingSkeleton>> = {
    args: {
        ...defaultProps,
        height: scale(15),
        width: scale(45),
    },
    render: args => <LoadingSkeleton {...args} />,
};

export const Text: StoryObj<ComponentProps<typeof LoadingSkeleton>> = {
    args: {
        ...defaultProps,
        count: 5,
        verticalStep: scale(2),
    },
    render: args => <LoadingSkeleton {...args} />,
};
