import { type ReactNode } from 'react';

export interface IDescriptionListProps {
    className?: string;
    children: ReactNode;
}

interface IDescriptionListDefaultProps {
    /**
     * Item name
     */
    name?: string;
    /**
     * Item value "whiteSpace": "nowrap"
     */
    valueNoWrap?: boolean;
    /**
     * Class name
     */
    className?: string;
}

export interface IDescriptionListBooleanItem extends IDescriptionListDefaultProps {
    type: 'boolean';
    /**
     * Item value
     */
    value?: boolean;
}

export interface IDescriptionListDateItem extends IDescriptionListDefaultProps {
    type: 'date';
    /**
     * Item value
     */
    value?: string;
    /**
     * Date format,
     * default: 'dd.MM.yyyy, HH:mm'
     */
    format?: string;
}

export interface IDescriptionListBaseItem extends IDescriptionListDefaultProps {
    type?: 'base';
    /**
     * Item value
     */
    value?: ReactNode | string;
}

export type DescriptionListItemType = IDescriptionListBooleanItem | IDescriptionListDateItem | IDescriptionListBaseItem;
