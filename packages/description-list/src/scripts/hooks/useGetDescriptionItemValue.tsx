import { useMemo } from 'react';

import { formatDate, DateFormatters } from '@greensight/core-components-common';

import {
    DescriptionListItemType,
    IDescriptionListBaseItem,
    IDescriptionListBooleanItem,
    IDescriptionListDateItem,
} from '../../types';

/**
 * Get a value depending on the content type
 */
export const useGetInfoItemValue = (item: DescriptionListItemType) =>
    useMemo(() => {
        switch (item.type) {
            case 'boolean': {
                const { value } = item as IDescriptionListBooleanItem;
                return value ? 'да' : 'нет';
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
    }, [item]);
