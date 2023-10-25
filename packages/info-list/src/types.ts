import { ReactNode } from 'react';

export interface InfoListTypes {
    className?: string;
    children: ReactNode;
}

export interface BaseInfoListTypes {
    name?: string;
    value?: any;
    valueNoWrap?: boolean;
    type?: 'base';
}

export interface InfoListItemTypes extends Omit<BaseInfoListTypes, 'type'> {
    type: 'date' | 'boolean';
}

export interface InfoListItemLinkTypes extends Omit<BaseInfoListTypes, 'type'> {
    type: 'link';
    link: string;
    renderLink?: (props: { href: string; children: ReactNode | ReactNode[] }) => JSX.Element;
}

export type InfoListItemCommonType = BaseInfoListTypes | InfoListItemTypes | InfoListItemLinkTypes;

export interface GetInfoItemsTypes {
    created_at?: string;
    updated_at?: string;
}
