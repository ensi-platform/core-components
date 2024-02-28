import type { Meta, StoryObj } from '@storybook/react';
import type { CSSProperties, ComponentProps } from 'react';

import README from '../README.md';
import Picture from './index';

export default {
    title: 'Controls / Picture',
    component: Picture,
    args: {
        alt: 'замещающий текст',
        width: '600',
        height: '400',
        sources: [
            {
                media: '(max-width: 767px)',
                image: '/android-chrome-192x192.png',
            },
            {
                media: '(min-width: 768px)',
                image: '/android-chrome-512x512.png',
            },
        ],
        loading: 'lazy',
        objectFit: 'none',
    },
    argTypes: {
        objectFit: {
            options: ['cover', 'contain', 'fill', 'none', 'scale-down'],
            control: { type: 'radio' },
        },
        loading: {
            options: ['lazy', 'eager', ''],
            control: { type: 'radio' },
        },
    },
    parameters: {
        docs: {
            description: {
                component: README,
            },
        },
    },
} as Meta<typeof Picture>;

export const Basic: StoryObj<ComponentProps<typeof Picture>> = {
    render: (args: ComponentProps<typeof Picture> & { objectFit?: CSSProperties['objectFit'] }) => (
        <Picture
            {...args}
            style={{
                objectFit: args.objectFit,
                width: args.width,
                height: args.height,
            }}
        />
    ),
};
