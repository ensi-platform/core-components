import { Block } from '@ensi-platform/core-components-block';
import { Layout, defaultTheme, emptyCSS, scale } from '@ensi-platform/core-components-common';

import type { LayoutItemProps } from '@greensight/gds/types/src/components/Layout/Item';
import type { Meta, StoryObj } from '@storybook/react';

import type { ComponentProps } from 'react';

import README from '../README.md';
import { LoadingSkeleton, LoadingSkeletonSizes, LoadingSkeletonVariants } from './index';

const { colors } = defaultTheme;

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
                type: { summary: 'CSSObject' },
            },
            description: 'Additional skeleton wrapper styles.',
            summary: 'object',
        },
        skeletonCSS: {
            table: {
                type: { summary: 'CSSObject' },
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
        asLayoutItem: {
            table: {
                type: { summary: 'boolean' },
            },
            required: false,
            description:
                'Use `Layout.Item` as a skeleton wrapper instead of a `div`<br />When `asLayoutItem` is `true` `verticalStep` prop has no effect<br />Use `layoutItemProps` or `Layout` props to set spacing.',
            defaultValue: {
                summary: false,
            },
            summary: 'boolean',
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
        layoutItemProps: {
            table: {
                type: { summary: 'LayoutItemProps' },
            },
            description:
                'Props for `Layout.Item`, used only when `asLayoutItem` is `true`<br />Has no effect if `asLayoutItem` is `false`',
            summary: 'object',
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
    layoutItemProps: {} as LayoutItemProps,
    skeletonCSS: emptyCSS,
    skeletonWrapperCSS: emptyCSS,
    className: '',
    asLayoutItem: false,
    circle: false,
    disableAnimation: false,
    reverseAnimationDirection: false,
};

export const Basic: StoryObj<ComponentProps<typeof LoadingSkeleton>> = {
    args: {
        ...defaultProps,
    },
    render: args => <LoadingSkeleton {...args} />,
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

export const WithLayout: StoryObj<ComponentProps<typeof LoadingSkeleton>> = {
    args: {
        ...defaultProps,
        asLayoutItem: true,
        height: scale(8),
    },
    render: args => {
        const blockCSS = {
            height: '100%',
            border: `2px solid ${colors.primary}`,
        };

        return (
            <Layout type="grid" rows={3} cols={3} gap={scale(2)}>
                <Layout.Item row={[1, 2]} col={[1, 2]}>
                    <Block css={blockCSS}>
                        <Block.Body>Layout.Item</Block.Body>
                    </Block>
                </Layout.Item>

                <LoadingSkeleton
                    {...args}
                    layoutItemProps={{ row: [2, 3], col: [2, 3], align: 'center', justify: 'center' }}
                />

                <Layout.Item row={[3, 4]} col={[3, 4]}>
                    <Block css={blockCSS}>
                        <Block.Header>Layout.Item</Block.Header>

                        <Block.Body>
                            <LoadingSkeleton {...args} asLayoutItem={false} />
                        </Block.Body>
                    </Block>
                </Layout.Item>
            </Layout>
        );
    },
};

export const WithBlock: StoryObj<ComponentProps<typeof LoadingSkeleton>> = {
    args: {
        ...defaultProps,
        count: 6,
        verticalStep: scale(5),
        height: scale(8),
    },
    render: args => (
        <Block>
            <Block.Body>
                <LoadingSkeleton {...args} />
            </Block.Body>
        </Block>
    ),
};
