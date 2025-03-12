import { useTranslation } from 'react-i18next';

import type { DescriptionListItemType, IDefaultDateParams } from '../types';

/**
 * Get params' objects for default dates
 */
export const DefaultDates = ({ created_at, updated_at }: IDefaultDateParams): Array<DescriptionListItemType> => {
    const { t } = useTranslation('translation');
    return [
        {
            name: t('translation:createdAt'),
            value: created_at,
            type: 'date',
        },
        {
            name: t('translation:updatedAt'),
            value: updated_at,
            type: 'date',
        },
    ];
};
