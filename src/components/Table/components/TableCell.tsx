import { CellContext } from '@tanstack/react-table';
import { format } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

import { scale, useTheme } from '@scripts/gds';
import { formatPrice, fromKopecksToRouble, prepareTelValue } from '@scripts/helpers';
import { useLinkCSS } from '@scripts/hooks';

export type FieldTypeEnum =
    | 'string'
    | 'email'
    | 'phone'
    | 'datetime'
    | 'date'
    | 'url'
    | 'int'
    | 'price'
    | 'float'
    | 'enum'
    | 'bool'
    | 'photo'
    | 'plural_numeric';

export type FieldFilterTypeEnum = 'default' | 'like' | 'many' | 'range';

export type MetaEnumValue = { id: string; title: string };

export type MetaField = {
    /**
     * Символьный код поля
     * @example id
     * @example product.name
     */
    code: string;

    /**
     * Тип фильтра по данному полю из @see FieldFilterTypeEnum
     * @example default
     */
    filter: FieldFilterTypeEnum | null;

    /**
     * @deprecated
     */
    filter_name?: string;

    /**
     * Если фильтр обычный (default), то это поле -
     * ключ, под которым необходимо передавать значение
     */
    filter_key?: string;

    /**
     * Доступно ли поле для вывода в таблицу
     */
    is_object: boolean;
    include?: string | null;
    list: boolean;

    /**
     * Название поля на русском языке
     * @example Название
     */
    name: string;

    /**
     * Доступно ли поле для сортировки
     */
    sort: boolean;

    /**
     * Ключ, который необходимо передавать для сортировки по данному полю
     */
    sort_key?: string;

    /**
     * Тип поля из FieldTypeEnum
     */
    type: FieldTypeEnum;

    /**
     * Поле для директорий
     */
    enum_info?: {
        endpoint?: string;
        values?: MetaEnumValue[];
    };

    /**
     * Если тип фильтра по диапазону (range) -
     * ключ, под которым необходимо передавать значение ОТ
     */
    filter_range_key_from?: string;

    /**
     * Если тип фильтра по диапазону (range) -
     * ключ, под которым необходимо передавать значение ДО
     */
    filter_range_key_to?: string;
    // Для типа plural_numeric
    value_types?: {
        /** Лейбл */
        name: string;
        /** Как рендерить компонент */
        type: FieldTypeEnum;
        /**
         * Ключ в массиве данных
         */
        field: string;
        /** Значение */
        field_value: string;
    }[];
};

export interface CellProps extends Partial<CellContext<any, any>> {
    type:
        | 'photo'
        | 'double'
        | 'array'
        | 'date'
        | 'datetime'
        | 'price'
        | 'string'
        | 'email'
        | 'phone'
        | 'url'
        | 'int'
        | 'float'
        | 'enum'
        | 'bool'
        | 'object'
        | 'plural_numeric';
    value: any;
    metaField?: MetaField;
}

export const Cell: FC<CellProps> = ({ value, type, row, metaField }) => {
    const { colors } = useTheme();
    const linkStyles = useLinkCSS();

    if ((value === undefined || value === null) && type !== 'photo') return '-';
    switch (type) {
        case 'plural_numeric': {
            const typeFieldName = metaField?.value_types?.[0].field;

            if (!typeFieldName || !metaField?.value_types) {
                console.error('Cell error: plural_numeric has invalid value_types, check field=', metaField);
                return 'N/A';
            }

            const typeId = row?.original[`${typeFieldName}_original`]?.id;

            if (!typeId) return 'N/A';

            const typeOption = metaField.value_types.find(e => e.field_value === typeId);
            if (!typeOption) return 'N/A';

            // TODO: обработать остальные кейсы
            return typeOption.type === 'price' ? (
                <p css={{ whiteSpace: 'nowrap' }}>{formatPrice(fromKopecksToRouble(value))} ₽</p>
            ) : (
                `${value}%`
            );
        }
        case 'photo':
            return (
                <div css={{ width: scale(6), height: scale(6), borderRadius: scale(1, true) }}>
                    <Image
                        width={scale(6)}
                        height={scale(6)}
                        unoptimized
                        src={value || '/noimage.png'}
                        alt=""
                        objectFit="contain"
                    />
                </div>
            );

        case 'double': {
            const [title, descr] = value;

            return (
                <>
                    <p>{title}</p>
                    <p css={{ color: colors?.grey800, whiteSpace: 'pre' }}>{descr}</p>
                </>
            );
        }

        case 'array':
            return (
                <ul css={{ li: { ':not:first-of-type': { marginTop: scale(1) } } }}>
                    {Array.isArray(value) && value.map(item => item && <li key={item.toString()}>{item}</li>)}
                </ul>
            );

        case 'date':
            return <p>{format(new Date(value), 'dd.MM.yyyy')}</p>;

        case 'datetime':
            return <p>{format(new Date(value), 'dd.MM.yyyy HH:mm')}</p>;

        case 'price':
            return <p css={{ whiteSpace: 'nowrap' }}>{formatPrice(fromKopecksToRouble(value))} ₽</p>;

        case 'phone':
            return (
                <p css={{ maxWidth: '50ch', width: 'max-content', wordBreak: 'break-word' }}>
                    {prepareTelValue(value)}
                </p>
            );
        case 'string':
        case 'email':
        case 'int':
        case 'float':
            return value;

        case 'bool':
            return value ? 'Да' : 'Нет';

        case 'url':
            return (
                <Link href={value} passHref>
                    <a css={linkStyles}>{value}</a>
                </Link>
            );

        case 'enum': {
            if (!value) return '-';
            if (typeof value === 'string') return value;
            return JSON.stringify(value);
        }

        default:
            return <p>-</p>;
    }
};
