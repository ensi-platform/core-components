import type { DescriptionListItemType, IDefaultDateParams } from '../types';

/**
 * Get params' objects for default dates
 */
export const getDefaultDates = ({ created_at, updated_at, t }: IDefaultDateParams): Array<DescriptionListItemType> => [
    {
        name: t('common:components.createdAt'),
        value: created_at,
        type: 'date',
    },
    {
        name: t('common:components.updatedAt'),
        value: updated_at,
        type: 'date',
    },
];
