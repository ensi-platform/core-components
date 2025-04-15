/* eslint-disable react-hooks/rules-of-hooks */
import { IconSmallCard } from '@ensi-platform/core-components-common';

import type { Meta, StoryObj } from '@storybook/react';

import { type ComponentProps, type MouseEvent, useCallback, useEffect, useState } from 'react';

import { Tab, TabLinkTitle, TabList, type TabPropsType } from '.';
import README from '../README.md';
import { ShowMoreButton } from './components/ShowMore';
import { TabHeadingList } from './components/TabHeadingList';

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
        keepMounted: {
            control: 'boolean',
            description: 'Mount all tabs and keep them mounted despite hidden',
        },
        variant: {
            options: ['primary'],
            control: { type: 'radio' },
            description: 'Variant of the component',
        },
        size: {
            options: ['md'],
            control: { type: 'radio' },
            description: 'Size of the component',
        },
        breakpoint: {
            control: 'number',
            description: 'Width breakpoint for desktop appearance',
        },
        prefix: {
            control: 'text',
            description: 'Prefix for tabs to differentiate multiple tabs list on one page',
        },
        className: {
            control: 'text',
            description: 'Custom class name for the component',
        },
        containerCSS: {
            control: 'object',
            description: 'Custom CSS object for the container',
        },
        selectedId: {
            control: 'text',
            description: 'ID of the selected tab',
        },
        defaultMatch: {
            options: ['mobile', 'desktop'],
            control: { type: 'radio' },
            description: 'Default match type for the component',
        },
        collapsedTabsIds: {
            options: ['First 3', 'undefined'],
            control: 'radio',
            mapping: {
                'First 3': ['1', '2', 'link1'],
                undefined,
            },
            description: 'Array of IDs for collapsed tabs',
        },
        ShowMoreButton: {
            options: ['div', 'ShowMoreButton'],
            control: { type: 'radio' },
            mapping: {
                div: 'div',
                ShowMoreButton,
            },
            description: 'Component for the Show More button',
        },
        onChange: {
            control: 'function',
            description: 'Callback function for change events',
        },
        dataTestId: {
            control: 'text',
            description: 'Data test ID for the component',
        },
        countErrors: {
            control: 'object',
            description: 'Array of error counts with IDs ({id: string, count: number}[])',
        },
        TabHeadingList: {
            options: ['div', 'TabHeadingList'],
            control: { type: 'radio' },
            mapping: {
                div: 'div',
                TabHeadingList,
            },
            description: 'Component for the tab heading list',
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
        id: {
            control: 'text',
            description: 'Unique identifier for the component',
        },
        title: {
            control: 'text',
            description: 'Text tab label',
        },
        className: {
            control: 'text',
            description: 'Custom CSS class name for styling',
        },
        toggleCSS: {
            control: 'object',
            description: 'Emotion CSS object for custom toggle styling',
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
        dataTestId: {
            control: 'text',
            description: 'Test identifier for testing purposes',
        },
        unfocusable: {
            control: 'boolean',
            description: 'Whether the tab can receive focus',
        },
        renderTitle: {
            control: 'object',
            description: 'Render props pattern function for custom title rendering',
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

export const ControlledTabs: StoryObj<ComponentProps<typeof TabList> & {}> = {
    render: () => {
        const [currentTab, setCurrentTab] = useState(0);

        const handleChange = useCallback((e: MouseEvent, payload: { selectedId: any }) => {
            setCurrentTab(payload.selectedId);
        }, []);

        const increaseTab = useCallback(() => {
            setCurrentTab(prev => (prev >= 2 ? 0 : prev + 1));
        }, []);

        return (
            <>
                <button
                    css={{ padding: 8, marginBottom: 10, backgroundColor: '#0d7ad9', color: 'white' }}
                    onClick={increaseTab}
                >
                    Switch to next tab
                </button>
                <TabList onChange={handleChange} selectedId={`${currentTab}`}>
                    <Tab title="First tab" id="0">
                        <div>Content of first tab</div>
                    </Tab>
                    <Tab title="Second tab" id="1">
                        <div>Content of second tab</div>
                    </Tab>
                    <Tab title="Third tab" id="2">
                        <div>Content of third tab</div>
                    </Tab>
                </TabList>
            </>
        );
    },
};
