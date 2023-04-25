/* eslint-disable react-hooks/rules-of-hooks */
import type { Meta, StoryObj } from '@storybook/react';
import { ColumnSort, Row, createColumnHelper } from '@tanstack/react-table';
import { ComponentProps, useCallback, useEffect, useState } from 'react';

import README from './README.md';
import { getSelectColumn, getSettingsColumn } from './columns';
import RowTooltipWrapper from './components/RowTooltipWrapper';
import { Cell } from './components/TableCell';
import Table, { TooltipItem, TrProps, useSorting, useTable } from './index';

type Product = {
    id: number;
} & Partial<{
    allow_publish: boolean;
    barcode: string | null;
    base_price: string | null;
    brand_id: number | string | null;
    category_id: number;
    code: string;
    created_at: string;
    description: string | null;
    external_id: string | null;
    height: number | null;
    is_adult: boolean;
    length: number | null;
    name: string;
    type: number;
    updated_at: string;
    vendor_code: string;
    weight: number | null;
    weight_gross: number | null;
    width: number | null;
    main_image_url: string;
    main_image_file: string;
}>;

export default {
    title: 'Components / Future / Table',
    component: Table,
    parameters: {
        docs: {
            description: {
                component: README,
            },
        },
        backgrounds: {
            default: 'grey200',
        },
    },
} as Meta<typeof Table>;

const initialSort: ColumnSort = {
    id: 'id',
    desc: false,
};

const columnHelper = createColumnHelper<Product>();

const columns = [
    getSelectColumn<Product>(undefined, 'Example'),

    columnHelper.accessor('id', {
        header: 'ID',
        cell: props => props.getValue(),
        enableHiding: true,
    }),

    columnHelper.accessor('name', {
        header: 'Наименование',
        cell: props => props.getValue(),
        enableHiding: true,
    }),
    columnHelper.accessor('vendor_code', {
        header: 'Поставщик',
        cell: props => props.getValue(),
        enableHiding: true,
        enableSorting: false,
    }),
    columnHelper.accessor('brand_id', {
        header: 'Бренд',
        cell: props => props.getValue(),
        enableHiding: true,
        enableSorting: false,
    }),
    columnHelper.accessor('category_id', {
        header: 'Категория',
        cell: props => props.getValue(),
        enableHiding: true,
        enableSorting: false,
    }),
    columnHelper.accessor('description', {
        header: 'Описание',
        cell: props => props.getValue(),
        enableHiding: true,
        enableSorting: false,
    }),
    columnHelper.accessor('main_image_url', {
        header: 'Изображение',
        cell: props => <Cell type="photo" value={props.getValue()} {...props} />,
        enableHiding: true,
        enableSorting: false,
    }),
    getSettingsColumn({
        tooltipContent: [
            {
                action() {},
                disabled: false,
                text: 'Действие доступное из меню в каждой строке',
                type: 'copy',
            },
        ],
    }),
];

const mockData: Product[] = [
    {
        id: 46,
        external_id: '',
        category_id: 18,
        brand_id: null,
        code: 'kuku-koksoval',
        name: 'Гав гав гав гаввв',
        description: '',
        type: 1,
        allow_publish: true,
        vendor_code: 'увы',
        barcode: '34344444',
        weight: 0.2,
        weight_gross: 0.333,
        length: null,
        height: null,
        width: 150,
    },
    {
        id: 47,
        external_id: '',
        category_id: 24,
        brand_id: null,
        code: 'dfsdfsfs',
        name: 'Гав гав гав гаввв',
        description: null,
        type: 2,
        allow_publish: true,
        vendor_code: '343',
        barcode: '32323334',
        weight: 0.2,
        weight_gross: 0,
        length: 0,
        height: 0,
        width: 150,
    },
    {
        id: 77,
        external_id: '',
        category_id: 18,
        brand_id: null,
        code: 'asdasdasd',
        name: 'Гав гав гав гаввв',
        description: '',
        type: 1,
        allow_publish: true,
        vendor_code: '2',
        barcode: '1231231232222',
        weight: null,
        weight_gross: 0.333,
        length: null,
        height: null,
        width: 150,
    },
    {
        id: 78,
        external_id: '',
        category_id: 1,
        brand_id: 85,
        code: 'pro-2',
        name: 'Гав гав гав гаввв',
        description: '',
        type: 1,
        allow_publish: true,
        vendor_code: 'апорт123',
        barcode: '34567888',
        weight: null,
        weight_gross: 887,
        length: 78,
        height: 787,
        width: 150,
    },
    {
        id: 79,
        external_id: '',
        category_id: 1,
        brand_id: null,
        code: 'yuvyv',
        name: 'Гав гав гав гаввв',
        description: '',
        type: 1,
        allow_publish: true,
        vendor_code: 'выв',
        barcode: '34344442',
        weight: 0.2,
        weight_gross: 0,
        length: 0,
        height: 0,
        width: 150,
    },
    {
        id: 81,
        external_id: '',
        category_id: 12,
        brand_id: null,
        code: '43',
        name: 'Гав гав гав гаввв',
        description: '',
        type: 1,
        allow_publish: true,
        vendor_code: '233',
        barcode: '23232333',
        weight: 0.2,
        weight_gross: 0.333,
        length: null,
        height: null,
        width: 150,
    },
    {
        id: 82,
        external_id: '',
        category_id: 35,
        brand_id: null,
        code: '234',
        name: 'Гав гав гав гаввв',
        description: 'Тестики массовости',
        type: 1,
        allow_publish: true,
        vendor_code: '2342',
        barcode: '23423324',
        weight: 0.2,
        weight_gross: null,
        length: null,
        height: null,
        width: 150,
    },
    {
        id: 83,
        external_id: '',
        category_id: 43,
        brand_id: null,
        name: 'Рис',
        description: 'Рис вкусный',
        vendor_code: '00000100',
        barcode: '12345672',
        main_image_url: 'https://es-dev.ensi.tech/catalog/products/97/31/eWh3h8uxPdNspeY8Bcix.jpg',
    },
];

export const Basic: StoryObj<ComponentProps<typeof Table> & {}> = {
    args: {
        block: true,
        stickyHeader: false,
    },
    argTypes: {
        block: {
            description: 'Растягивать таблицу на всю ширину контейнера. По-умолчанию `true`',
        },
        stickyHeader: {
            description: 'Включить умное липкое поведение шапки таблицы. По-умолчанию `false`.',
        },
    },
    parameters: {
        docs: {
            description: {
                story: 'Story description',
            },
        },
    },
    render: args => {
        const [{ sorting }, sortingPlugin] = useSorting<Product>(initialSort);

        const [products, setProducts] = useState<Product[]>([]);

        useEffect(() => {
            const sort = sorting[0];
            const compare = (a: any, b: any) => {
                if (sort.desc) {
                    return +a > +b;
                }

                return +a < +b;
            };

            setTimeout(() => {
                const clone = mockData.slice();
                clone.sort((a, b) => (compare(a[sort.id as keyof typeof a], b[sort.id as keyof typeof b]) ? 1 : -1));

                setProducts(clone);
            }, 1000);
        }, [sorting]);

        const table = useTable(
            {
                data: products,
                columns,
                meta: {
                    tableKey: `storybook_FirstTable`,
                },
            },
            [sortingPlugin]
        );

        const getTooltipForRow = useCallback(
            (row: Row<any>): TooltipItem[] => {
                if (table.getSelectedRowModel().flatRows.length) {
                    return [
                        {
                            text: `Операция над выделенными: ${table.getSelectedRowModel().flatRows.length} строками`,
                            type: 'delete',
                            action() {
                                alert('удалить');
                            },
                            disabled: false,
                        },
                    ];
                }

                return [
                    {
                        text: `Перейти в деталку ${row.id}`,
                        action() {
                            // eslint-disable-next-line no-template-curly-in-string
                            alert('push(`/path/to/entities/${row.id}`)');
                        },
                        disabled: false,
                        type: 'edit',
                    },
                    {
                        text: `Удалить #${row.id}`,
                        action() {},
                        disabled: (+row.id as number) % 2 === 1,
                        type: 'delete',
                        disabledHint: 'У вас нет прав на совершение данного действия',
                    },
                ];
            },
            [table]
        );

        const renderRow = useCallback(
            ({ children, ...props }: TrProps<any>) => (
                <RowTooltipWrapper {...props} getTooltipForRow={getTooltipForRow}>
                    {children}
                </RowTooltipWrapper>
            ),
            [getTooltipForRow]
        );

        return (
            <div>
                <p>Выделено: {table.getSelectedRowModel().flatRows.length}</p>
                <Table {...args} instance={table} Tr={renderRow} />
            </div>
        );
    },
};
