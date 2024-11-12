import { DateFormatters, formatDate } from '@ensi-platform/core-components-common';

import { useMemo } from 'react';

import {
    type DescriptionListItemType,
    type IDescriptionListBaseItem,
    type IDescriptionListBooleanItem,
    type IDescriptionListDateItem,
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
