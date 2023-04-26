## Описание

Таблица основана на [@tanstack/table](https://tanstack.com/table/v8), но вбирает в себя элементы предыдущей ensi таблицы, такие как:

1. Cells
2. TableHeader/TableFooter/TableEmpty
3. Заготовленные колонки для выделения и настроек таблицы (getSelectColumn, getSettingsColumn)

## Использование

Для максимальной гибкости компонента, рендер разделен с логикой через хук useTable, который является надстройкой над хуком [useReactTable](https://tanstack.com/table/v8/docs/api/core/table)

```tsx
const table = useTable({
    // плагины, настройки, состояние
});

// можно получать доступ к состоянию таблицы(выделенные строки, редактирование и т.д.) через table

return <Table
    instance={table}
    // визуальное отображение
/>;
```

## Редактируемые данные в таблице

По-умолчанию не сделана возможность редактировать строки, но при необходимости можно реализовать:

```tsx
declare module '@tanstack/react-table' {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface TableMeta<TData extends RowData> {
        onChangeRow?: (row: Row<TData>, value: any) => void;
    }
}

const columns = [
    {
        accessorKey: 'name',
        cell: ({ getValue, row, table }) => {
            const [value, setValue] = useState(() => getValue());

            return (
                <input
                    name="someinput"
                    value={value}
                    onChange={e => setValue(e.currentTarget.value)}
                    onBlur={() => {
                        if (table.options?.meta?.onChangeRow) {
                            table.options.meta.onChangeRow(row, value);
                        }
                    }}
                />
            );
        },
    },
];

// Допустим можно хранить значения в виде массива редактированных строк
const [state, setState] = useState<{ row: Row<any>; value: any }[]>([]);

const table = useTable({
    meta: {
        onChangeRow: (row, value) => {
            setState(old => {
                if (old.find(e => e.row === row)) {
                    return old.map(e => {
                        if (e.row === row) return { row, value };
                        return e;
                    });
                }

                return [...old, { row, value }];
            });
        },
    },
});
```
