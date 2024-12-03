/* eslint-disable react-hooks/rules-of-hooks */
import { IconSmallCard } from '@ensi-platform/core-components-common';

import type { Meta, StoryObj } from '@storybook/react';

import { type ComponentProps, useEffect, useState } from 'react';

import { Tab, TabLinkTitle, TabList, type TabPropsType } from '.';
import README from '../README.md';

export default {
    title: 'Components / Tabs',
    parameters: {
        docs: {
            description: {
                component: README,
            },
        },
    },
    component: TabList,
} as Meta<typeof TabList>;

export const Basic: StoryObj<ComponentProps<typeof TabList> & {}> = {
    name: 'TabList',
    args: {
        fullWidthScroll: false,
        scrollable: false,
        collapsible: false,
        mobile: false,
        theme: 'basic',
    },
    argTypes: {
        theme: {
            options: ['basic'],
            control: { type: 'radio' },
        },
        fullWidthScroll: {
            control: 'boolean',
            description: 'Fill extra space for tabs list',
        },
        scrollable: {
            control: 'boolean',
            description: 'Make tab list scrollable',
        },
        collapsible: {
            control: 'boolean',
            description: 'Collapse tab headings, that are not fit',
        },
        mobile: {
            control: 'boolean',
            description: 'Mobile appearance (changes scroll thumb)',
        },
    },
    render: args => {
        const [isLoading, setLoading] = useState(true);
        const [isLoadingRerender, setLoadingRerender] = useState(true);

        useEffect(() => {
            setTimeout(() => {
                setLoading(false);
            }, 2000);
            setTimeout(() => {
                setLoadingRerender(false);
            }, 1000);
        }, []);

        return (
            <TabList {...args}>
                <Tab title="First tab" id="1" leftAddons={<IconSmallCard />}>
                    Content of first tab
                </Tab>
                <Tab title="2nd disabled" disabled id="2">
                    <div>You cant reach me</div>
                </Tab>
                <Tab
                    title="Link has focus"
                    id="link1"
                    renderTitle={props => <TabLinkTitle href="https://google.com" target="_blank" {...props} />}
                    leftAddons={<IconSmallCard />}
                    rightAddons={<span>[SALE!]</span>}
                >
                    <div />
                </Tab>
                <Tab title="Third tab" id="3" rightAddons={<span>99+</span>}>
                    <div>Its a third tab</div>
                </Tab>
                {!isLoadingRerender
                    ? [1, 2, 3].map(e => (
                          <Tab
                              key={e + 3}
                              title={isLoading ? `Loading tab#${e + 3}` : `Appeared #${e + 3}`}
                              id={e + 3}
                              disabled={isLoading}
                          >
                              <div>Its a dynamic tab #{e + 3}</div>
                          </Tab>
                      ))
                    : null}
                {[4, 5, 6, 7, 8, 9, 10].map(e => (
                    <Tab
                        key={e + 3}
                        title={isLoading ? `Loading tab#${e + 3}` : `Dynamic tab#${e + 3}`}
                        id={e + 3}
                        disabled={isLoading}
                    >
                        <div>Its a dynamic tab #{e + 3}</div>
                    </Tab>
                ))}
                <Tab
                    title="I am a last link"
                    id="link2"
                    renderTitle={props => <TabLinkTitle href="https://ya.ru" target="_blank" {...props} />}
                    unfocusable
                >
                    <div />
                </Tab>
            </TabList>
        );
    },
};

function Content() {
    // eslint-disable-next-line no-console
    console.info('Content of second tab is rendered');
    return <span>Content of second tab</span>;
}

export const TabProps: StoryObj<ComponentProps<typeof Tab> & {}> = {
    name: 'Tab',
    args: {
        title: 'Title',
        hidden: false,
        disabled: false,
        leftAddons: false,
        rightAddons: false,
        keepMounted: false,
    },
    argTypes: {
        title: {
            control: 'text',
            description: 'Text tab label',
        },
        hidden: {
            control: 'boolean',
            description: 'Used to visually hide tab and tab content',
        },
        disabled: {
            control: 'boolean',
            description: 'Used to prevent user from changing to this tab',
        },
        leftAddons: {
            control: 'radio',
            options: ['None', 'Icon'],
            description: 'Left slot for custom addons',
            mapping: {
                None: undefined,
                Icon: <IconSmallCard />,
            },
        },
        rightAddons: {
            control: 'radio',
            options: ['None', 'Icon'],
            description: 'Right slot for custom addons',
            mapping: {
                None: undefined,
                Icon: <IconSmallCard />,
            },
        },
        keepMounted: {
            control: 'boolean',
            description: "Mount tab content even if it's not visible",
        },
    },
    render: (args: TabPropsType) => (
        <TabList>
            <Tab id="0" title="Tab 0">
                Default opened tab. Try to change controls for second tab.
                {args.keepMounted ? <p>Check your console!</p> : null}
            </Tab>
            <Tab {...args} id="1">
                <Content />
            </Tab>
        </TabList>
    ),
};
