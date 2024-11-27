/* eslint-disable react-hooks/rules-of-hooks */
import { IconSmallCard as TicketIcon } from '@ensi-platform/core-components-common';

import type { Meta, StoryObj } from '@storybook/react';

import { type ComponentProps, useEffect, useState } from 'react';

import { Tab, TabLinkTitle, TabsList } from '.';
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
    component: TabsList,
} as Meta<typeof TabsList>;

export const Basic: StoryObj<ComponentProps<typeof TabsList> & {}> = {
    args: {
        fullWidthScroll: false,
        scrollable: false,
        collapsible: false,
        theme: 'basic',
    },
    argTypes: {
        theme: {
            options: ['basic'],
            control: { type: 'radio' },
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
            <TabsList {...args}>
                <Tab title="First tab" id="1" leftAddons={<TicketIcon />}>
                    Content of first tab
                </Tab>
                <Tab title="2nd disabled" disabled id="2">
                    <div>You cant reach me</div>
                </Tab>
                <Tab
                    title="Link has focus"
                    id="link1"
                    renderTitle={props => <TabLinkTitle href="https://google.com" target="_blank" {...props} />}
                    leftAddons={<TicketIcon />}
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
                    /** You can use custom wrapper for link, such as Link component from next/link */
                    renderTitle={props => <TabLinkTitle href="https://ya.ru" target="_blank" {...props} />}
                    unfocusable
                >
                    <div />
                </Tab>
            </TabsList>
        );
    },
};
