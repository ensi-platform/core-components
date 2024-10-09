import type { Meta, StoryObj } from '@storybook/react';
import type { ComponentProps } from 'react';

import { IconPlus } from '@greensight/core-components-common';

import README from '../README.md';
import { Accordion } from './index';

export default {
    title: 'Controls / Accordion',
    component: Accordion,
    parameters: {
        docs: {
            description: {
                component: README,
            },
        },
    },
} as Meta<typeof Accordion>;

const StoryComponent = (args: Omit<ComponentProps<typeof Accordion>, 'children'>) => (
    <Accordion {...args}>
        <Accordion.Item uuid="0">
            <Accordion.Heading>
                <Accordion.Button>Title 1</Accordion.Button>
            </Accordion.Heading>
            <Accordion.Panel>Panel 1</Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item uuid="1">
            <Accordion.Heading>
                <Accordion.Button>Title 2</Accordion.Button>
            </Accordion.Heading>
            <Accordion.Panel>Panel 2</Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item uuid="2">
            <Accordion.Heading>
                <Accordion.Button>Title 3</Accordion.Button>
            </Accordion.Heading>
            <Accordion.Panel>Panel 3</Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item uuid="3">
            <Accordion.Heading>
                <Accordion.Button>Title 4</Accordion.Button>
            </Accordion.Heading>
            <Accordion.Panel>Panel 4</Accordion.Panel>
        </Accordion.Item>
    </Accordion>
);

type Story = StoryObj<Omit<ComponentProps<typeof Accordion>, 'children'>>;

export const Basic: Story = {
    args: {},
    render: args => <StoryComponent {...args} />,
};

export const NoMultipleExpanded: Story = {
    args: {
        allowMultipleExpanded: false,
    },
    render: args => <StoryComponent {...args} />,
};

export const NoZeroExpanded: Story = {
    args: {
        allowZeroExpanded: false,
    },
    render: args => <StoryComponent {...args} />,
};

export const PreExpanded: Story = {
    args: {
        preExpanded: ['1'],
    },
    render: args => <StoryComponent {...args} />,
};

export const HeightAnimation: Story = {
    args: {},
    render: () => <StoryComponent animationType="height" />,
};

export const FadeInAnimation: Story = {
    args: { transitionTimeout: 600, transitionTimeoutExit: 0 },
    render: args => <StoryComponent animationType="fadeIn" {...args} />,
};

export const CustomAnimation: Story = {
    args: {},
    render: () => (
        <StoryComponent
            animationType="custom"
            onEnter={instance => {
                instance.style.transition = `transform ease 600ms`;
                instance.style.transform = `scale(0,0)`;
            }}
            onEntering={instance => {
                instance.style.transform = `scale(1,1)`;
            }}
            onExit={instance => {
                instance.style.transform = `scale(0,0)`;
            }}
        />
    ),
};
export const CustomIcon: Story = {
    args: {},
    render: () => <StoryComponent Icon={IconPlus} />,
};
