import { Block } from '@ensi-platform/core-components-block';
import { scale } from '@ensi-platform/core-components-common';

import type { Meta, StoryObj } from '@storybook/react';

import type { ComponentProps } from 'react';

import README from '../README.md';
import { type IStackProps, Stack } from './index';

export default {
    title: 'Components / Stack',
    component: Stack,
    parameters: {
        docs: {
            description: {
                component: README,
            },
        },
    },
    argTypes: {
        children: {
            table: {
                type: { summary: 'ReactNode', detail: '(value: number) => ReactNode ' },
            },
            required: true,
            description:
                'Accepts a `ReactNode` or `function`.<br />The `function` accepts an argument with the z-index value from the current context.',
            summary: 'ReactNode',
        },
        value: {
            table: {
                type: { summary: 'number' },
            },
            defaultValue: {
                summary: 10,
            },
            description: 'Initial z-index value.',
            summary: 'number',
        },
    },
} as Meta<IStackProps>;

const defaultProps: ComponentProps<typeof Stack> = {
    children: undefined,
    value: 10,
};

export const Basic: StoryObj<ComponentProps<typeof Stack>> = {
    args: {
        ...defaultProps,
    },
    render: args => (
        <div css={{ height: scale(22) }}>
            <Stack value={args.value}>
                {computedZIndex1 => (
                    <Block
                        css={{
                            zIndex: computedZIndex1,
                            position: 'relative',
                            border: '2px solid red',
                            width: scale(24),
                            height: scale(12),
                        }}
                    >
                        <Block.Body>z-index: {computedZIndex1}</Block.Body>
                        <Stack>
                            {computedZIndex2 => (
                                <Block
                                    css={{
                                        zIndex: computedZIndex2,
                                        position: 'absolute',
                                        border: '2px solid green',
                                        top: scale(5),
                                        left: scale(5),
                                        width: scale(24),
                                        height: scale(12),
                                    }}
                                >
                                    <Block.Body>z-index: {computedZIndex2}</Block.Body>
                                    <Stack>
                                        {computedZIndex3 => (
                                            <Block
                                                css={{
                                                    zIndex: computedZIndex3,
                                                    position: 'absolute',
                                                    border: '2px solid blue',
                                                    top: scale(5),
                                                    left: scale(5),
                                                    width: scale(24),
                                                    height: scale(12),
                                                }}
                                            >
                                                <Block.Body>z-index: {computedZIndex3}</Block.Body>
                                            </Block>
                                        )}
                                    </Stack>
                                </Block>
                            )}
                        </Stack>
                    </Block>
                )}
            </Stack>
        </div>
    ),
};
