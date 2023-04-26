/* eslint-disable react-hooks/rules-of-hooks */
import { Column, ColumnDef, Table, flexRender } from '@tanstack/react-table';
import { Dispatch, ReactNode, SetStateAction, useCallback, useMemo, useState } from 'react';
import { DragDropContext, Draggable, DropResult, Droppable } from 'react-beautiful-dnd';
import { followCursor } from 'tippy.js';

import Checkbox from '@components/Checkbox';
import Form from '@components/Form';
import Tabs from '@components/Tabs';

import Tooltip, { ContentBtn } from '@components/Tooltip';
import Drawer from '@components/Drawer';

import { Button, Layout, colors, scale } from '@scripts/gds';
import { protectFieldName } from '@scripts/helpers';
import { useLocalStorage } from '@scripts/hooks';

import DragIcon from '@icons/small/dragAndDrop.svg';
import KebabIcon from '@icons/small/kebab.svg';
import SettingsIcon from '@icons/small/settings.svg';
import TipIcon from '@icons/small/status/tip.svg';

import { TABLE_STORAGE_KEYS } from '../constants';
import { TooltipItem } from '../types';

type getSettingsColumnProps = {
    /** Need to show settings button flag */
    hasHeader?: boolean;
    /** Show cell */
    hasCell?: boolean;
    /** On settings click callback */
    onSettingsClick?: () => void;
    /** Columns to not show in popup. Array of column's ids */
    columnsToIgnore?: string[];
    /** Columns to disable switch off in popup. Array of column's ids */
    columnsToDisable?: string[];
    /** Items that are displayed in each row on kebab button click */
    tooltipContent?: TooltipItem[];
};

const COLUMNS_TO_IGNORE_DEFAULT = ['settings', 'select'];

const defaultColumnsToIgnore: string[] = [];
const defaultColumnsToDisable: string[] = ['id'];

const FormInner = ({
    table,
    columnsToIgnore,
    allColumns,
    columnsToDisable,
    sortedColumnNames,
    setSortedColumnNames,
}: {
    table: Table<any>;
    columnsToIgnore: string[];
    allColumns: Column<any>[];
    columnsToDisable: string[];
    sortedColumnNames: string[];
    setSortedColumnNames: Dispatch<SetStateAction<string[]>>;
}) => {
    const ignoredColumns = useMemo(() => [...columnsToIgnore, ...COLUMNS_TO_IGNORE_DEFAULT], [columnsToIgnore]);

    const editableColumns = useMemo(
        () => allColumns.filter(c => !ignoredColumns.includes(c.id)),
        [allColumns, ignoredColumns]
    );

    const colsToText = useMemo(
        () =>
            allColumns.reduce((acc, column) => {
                acc[column.id] =
                    flexRender(column.columnDef.header, {
                        column: { ...column, columnDef: { ...column.columnDef, enableSorting: false } },
                        table,
                        header: null,
                    }) || column.id;
                return acc;
            }, {} as Record<string, ReactNode>),
        [allColumns, table]
    );

    /** react beautiful dnd callbacks */
    const reorderItems = useCallback(
        (startIndex: number, endIndex: number) => {
            const newColumnOrder = sortedColumnNames.slice();
            const [movedItem] = newColumnOrder.splice(startIndex, 1);
            newColumnOrder.splice(endIndex, 0, movedItem);
            setSortedColumnNames(newColumnOrder);
        },
        [setSortedColumnNames, sortedColumnNames]
    );

    const onDragEnd = useCallback(
        ({ source, destination }: DropResult) => {
            if (!destination || (destination.index === source.index && destination.droppableId === source.droppableId))
                return;
            reorderItems(source.index, destination.index);
        },
        [reorderItems]
    );

    return (
        <Tabs>
            <Tabs.Tab title="Показывать" id="show">
                <ul
                    css={{
                        li: {
                            ':not(:last-of-type)': { marginBottom: scale(2) },
                        },
                        paddingTop: scale(3, true),
                    }}
                >
                    {editableColumns.map(column => (
                        <li key={column.id}>
                            <Form.Field name={protectFieldName(column.id)}>
                                <Checkbox disabled={columnsToDisable.includes(column.id)}>
                                    {flexRender(column.columnDef.header, {
                                        column: {
                                            ...column,
                                            columnDef: {
                                                ...column.columnDef,
                                                enableSorting: false,
                                            },
                                        },
                                        header: null,
                                        table,
                                    })}
                                </Checkbox>
                            </Form.Field>
                        </li>
                    ))}
                </ul>
            </Tabs.Tab>
            <Tabs.Tab title="Сортировывать" id="sort">
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="column-order">
                        {droppableprops => (
                            <ul
                                ref={droppableprops.innerRef}
                                {...droppableprops.droppableProps}
                                css={{ position: 'relative' }}
                            >
                                {sortedColumnNames?.map((column, index) => (
                                    <Draggable key={column} draggableId={column} index={index}>
                                        {(provided, snapshot) => (
                                            <li
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                css={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: scale(1),
                                                    padding: `${scale(1)}px 0`,
                                                    svg: { opacity: 0 },
                                                    '&:hover': { svg: { opacity: 1 } },
                                                    backgroundColor: colors.white,
                                                    left: `${scale(3)}px !important`,
                                                    ...(snapshot.isDragging && {
                                                        svg: { opacity: 1 },
                                                    }),
                                                }}
                                            >
                                                <DragIcon />
                                                {colsToText[column]}
                                            </li>
                                        )}
                                    </Draggable>
                                ))}

                                {droppableprops.placeholder}
                            </ul>
                        )}
                    </Droppable>
                </DragDropContext>
            </Tabs.Tab>
        </Tabs>
    );
};

const defaultTooltipContent: TooltipItem[] = [];

export const getSettingsColumn = ({
    hasHeader = true,
    hasCell = true,
    onSettingsClick,
    columnsToIgnore = defaultColumnsToIgnore,
    columnsToDisable = defaultColumnsToDisable,
    tooltipContent = defaultTooltipContent,
}: getSettingsColumnProps = {}): ColumnDef<any> => ({
    id: 'settings',

    header: ({ table }) => {
        const allColumns = table.getAllLeafColumns();

        const tableKey = table.options.meta?.tableKey;

        const [isOpen, setIsOpen] = useState(false);
        const close = () => setIsOpen(false);

        const [, setColumnsToHide] = useLocalStorage<string[]>(`${tableKey}${TABLE_STORAGE_KEYS.HIDDEN_COLS}`, []);
        const [, setColumnOrderByUser] = useLocalStorage<string[]>(`${tableKey}${TABLE_STORAGE_KEYS.ORDER_COLS}`, []);

        const [sortedColumnNames, setSortedColumnNames] = useState<string[]>(() =>
            allColumns
                .filter(column => column.getIsVisible() && column.id !== 'select' && column.id !== 'settings')
                .map(e => e.id)
        );

        const initialValues = useMemo(
            () =>
                allColumns.reduce((acc, column) => {
                    acc[column.id] = column.getIsVisible();
                    return acc;
                }, {} as Record<string, boolean>),
            [allColumns]
        );

        return hasHeader ? (
            <div css={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', height: '100%' }}>
                <Button
                    type="button"
                    theme="ghost"
                    hidden
                    size="sm"
                    Icon={SettingsIcon}
                    onClick={() => {
                        if (onSettingsClick) onSettingsClick();
                        setIsOpen(true);
                    }}
                    css={{
                        background: 'inherit !important',
                        paddingTop: '0 !important',
                        paddingBottom: '0 !important',
                    }}
                >
                    Управлять количеством столбцов
                </Button>

                <Drawer open={isOpen} onClose={close}>
                    <Drawer.Header title="Настройка столбцов" onClose={close} />
                    <Form
                        initialValues={initialValues}
                        onChange={values => {
                            const unselectedColNames = Object.keys(values).filter(e => !values[e]);

                            setSortedColumnNames(
                                allColumns
                                    .map(e => e.id)
                                    .filter(e => e !== 'select' && e !== 'settings' && !unselectedColNames.includes(e))
                            );
                        }}
                        onSubmit={vals => {
                            const columnNames = Object.keys(vals);
                            const columnsMap = allColumns.reduce((acc, column) => {
                                acc[protectFieldName(column.id)] = column;
                                return acc;
                            }, {} as Record<string, Column<any>>);

                            columnNames.forEach(colName => {
                                const col = columnsMap[colName];
                                col.toggleVisibility(vals[colName]);
                            });

                            const columnNamesToHide = columnNames.filter(colName => !vals[colName]);
                            setColumnsToHide(columnNamesToHide);

                            table.setColumnOrder(() => ['select', ...sortedColumnNames, 'settings']);
                            setColumnOrderByUser(['select', ...sortedColumnNames, 'settings']);

                            close();
                        }}
                        css={{ display: 'flex', flexDirection: 'column', height: '100%' }}
                    >
                        <Drawer.Content>
                            <FormInner
                                columnsToIgnore={columnsToIgnore}
                                allColumns={allColumns}
                                columnsToDisable={columnsToDisable}
                                setSortedColumnNames={setSortedColumnNames}
                                sortedColumnNames={sortedColumnNames}
                                table={table}
                            />
                        </Drawer.Content>
                        <Drawer.Footer>
                            <Button theme="fill" block onClick={close} type="button">
                                Отменить
                            </Button>
                            <Button type="submit" block>
                                Сохранить
                            </Button>
                        </Drawer.Footer>
                    </Form>
                </Drawer>
            </div>
        ) : null;
    },
    cell: () => {
        if (!hasCell) return null;
        const [visible, setVisible] = useState(false);
        return (
            <div css={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Tooltip
                    content={
                        <ul>
                            {tooltipContent.map(t => (
                                <li key={t.text}>
                                    <Layout
                                        type="flex"
                                        justify="space-between"
                                        gap={t.disabled && t.disabledHint ? 0 : scale(2)}
                                        align="center"
                                    >
                                        <Layout.Item grow={1}>
                                            <ContentBtn
                                                type={t.type}
                                                onClick={async e => {
                                                    e.stopPropagation();

                                                    await Promise.resolve(t.action());
                                                    setVisible(false);
                                                }}
                                                disabled={t.disabled}
                                            >
                                                {t.text}
                                            </ContentBtn>
                                        </Layout.Item>
                                        {t.disabled && t.disabledHint && (
                                            <Layout.Item align="end" justify="end" css={{ paddingRight: scale(2) }}>
                                                <Tooltip content={t.disabledHint} arrow>
                                                    <button
                                                        type="button"
                                                        css={{ verticalAlign: 'middle', paddingBottom: scale(1, true) }}
                                                    >
                                                        <TipIcon />
                                                    </button>
                                                </Tooltip>
                                            </Layout.Item>
                                        )}
                                    </Layout>
                                </li>
                            ))}
                        </ul>
                    }
                    plugins={[followCursor]}
                    followCursor="initial"
                    arrow
                    theme="light"
                    placement="bottom"
                    minWidth={scale(36)}
                    disabled={tooltipContent.length === 0}
                    appendTo={() => document.body}
                    visible={visible}
                    onClickOutside={() => setVisible(false)}
                >
                    <Button
                        type="button"
                        theme="ghost"
                        hidden
                        size="sm"
                        onClick={() => {
                            console.log('brooooo');
                            setVisible(true);
                        }}
                        Icon={KebabIcon}
                        css={{ ':hover': { background: 'inherit !important' } }}
                    >
                        Вызвать контекстное меню
                    </Button>
                </Tooltip>
            </div>
        );
    },
});
