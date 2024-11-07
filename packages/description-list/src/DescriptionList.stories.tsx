import type { Meta, StoryObj } from '@storybook/react';

import { type ComponentProps } from 'react';

import README from '../README.md';
import { DescriptionList, type DescriptionListItemType } from './index';

export default {
    title: 'Components / DescriptionList',
    parameters: {
        docs: {
            description: {
                component: README,
            },
        },
    },
    component: DescriptionList,
} as Meta<typeof DescriptionList>;

export const Basic: StoryObj<ComponentProps<typeof DescriptionList> & { items: DescriptionListItemType[] }> = {
    args: {
        items: [
            { name: 'Channel', value: 'app' },
            { name: 'Component', value: <p css={{ color: 'red' }}>350</p> },
            { name: 'Activity', value: true, type: 'boolean' },
            { name: 'Cost including discounts and \u00A0extra charges', value: '3399 rub.', valueNoWrap: true },
            { name: 'Delivery cost', value: '0 руб.' },
            { name: 'Creation date', value: '05.05.2023', type: 'date' },
        ],
    },
    argTypes: {
        items: {
            description: 'list items',
            table: {
                type: { summary: 'DescriptionListItemType[]' },
            },
            type: { name: 'array', value: { name: 'other', value: 'DescriptionListItemType' }, required: true },
            control: {
                type: 'object',
            },
        },
    },
    render: ({ items }) => (
        <DescriptionList>
            {items.map(item => (
                <DescriptionList.Item {...item} key={item.name} />
            ))}
        </DescriptionList>
    ),
};
