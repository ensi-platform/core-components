import type { DescriptionListItemType, IDefaultDateParams } from '../types';

/**
 * Get params' objects for default dates
 */
export const getDefaultDates = ({ created_at, updated_at }: IDefaultDateParams): Array<DescriptionListItemType> => [
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
