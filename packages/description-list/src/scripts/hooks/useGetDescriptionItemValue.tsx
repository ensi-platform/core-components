import { DateFormatters, formatDate } from '@ensi-platform/core-components-common';

import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import type {
    DescriptionListItemType,
    IDescriptionListBaseItem,
    IDescriptionListBooleanItem,
    IDescriptionListDateItem,
} from '../../types';

/**
 * Get a value depending on the content type
 */
export const useGetInfoItemValue = (item: DescriptionListItemType) => {
    const { t } = useTranslation('common');
    return useMemo(() => {
        switch (item.type) {
            case 'boolean': {
                const { value } = item as IDescriptionListBooleanItem;
                return value ? t('common:components.yes') : t('common:components.no');
            }
            case 'date': {
                const { value, format = DateFormatters.DATE_AND_TIME } = item as IDescriptionListDateItem;
                return value ? formatDate(new Date(value), format) : '-';
            }
            case 'base':
            default: {
                const { value } = item as IDescriptionListBaseItem;
                return value || '-';
            }
        }
    }, [item, t]);
};
