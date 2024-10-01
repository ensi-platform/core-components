import { IDefaultDateParams, DescriptionListItemType } from '../types';

/**
 * Get params' objects for default dates
 */
export const getDefaultDateParams = ({
    created_at,
    updated_at,
}: IDefaultDateParams): Array<DescriptionListItemType> => [
    {
        name: 'Дата создания',
        value: created_at,
        type: 'date',
    },
    {
        name: 'Дата обновления',
        value: updated_at,
        type: 'date',
    },
];
