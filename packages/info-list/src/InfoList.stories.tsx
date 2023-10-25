import { ComponentProps } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import InfoList from '.';
import README from '../README.md';
import { InfoListItemCommonType } from './types';

export default {
    title: 'Components / InfoList',
    parameters: {
        docs: {
            description: {
                component: README,
            },
        },
    },
    component: InfoList,
} as Meta<typeof InfoList>;

export const Basic: StoryObj<ComponentProps<typeof InfoList> & { items: InfoListItemCommonType[] }> = {
    args: {
        items: [
            { name: 'Канал', value: 'МП' },
            { name: 'Компонент', value: <p css={{ color: 'red' }}>350</p> },
            { name: 'Активность', value: true, type: 'boolean' },
            { name: 'Стоимость с учетом скидок и\u00A0наценок', value: '3399 руб.', valueNoWrap: true },
            { name: 'Стоимость доставки', value: '0 руб.' },
            { name: 'Дата создания', value: '05.05.2023', type: 'date' },
            { name: 'Промокод', value: 'DOSTAVKA', type: 'link', link: '/somewhere-link' },
        ],
    },
    render: ({ items }) => (
        <InfoList>
            {items.map(item => (
                <InfoList.Item {...item} key={item.name} />
            ))}
        </InfoList>
    ),
};
