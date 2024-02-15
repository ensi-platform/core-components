import { GetInfoItemsTypes, InfoListItemTypes } from '../types';

export const getDefaultDates = ({ created_at, updated_at }: GetInfoItemsTypes): Array<InfoListItemTypes> => [
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
