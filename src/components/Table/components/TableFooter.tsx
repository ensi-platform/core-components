import { FC } from 'react';
import Media from 'react-media';

import Pagination, { PaginationProps } from '@components/Pagination';
import Select from '@components/Select';

import { scale, useTheme } from '@scripts/gds';
import { useMedia } from '@scripts/hooks/useMedia';

const ITEMS_PER_PAGE = [
    { key: '10', value: 10 },
    { key: '20', value: 20 },
    { key: '30', value: 30 },
    { key: '40', value: 40 },
    { key: '50', value: 50 },
    { key: '100', value: 100 },
];

type TableFooterProps = Pick<PaginationProps, 'setPage' | 'controlledPage'> & {
    itemsPerPageCount: number;
    setItemsPerPageCount: (newItemsPerPageCount: number) => void;
    pages: number;
    className?: string;
};

export const TableFooter: FC<TableFooterProps> = ({
    itemsPerPageCount,
    setItemsPerPageCount,
    setPage,
    controlledPage,
    pages,
    className,
    ...props
}) => {
    const { colors, layout } = useTheme();
    const { md, mdMin } = useMedia();
    return (
        <footer
            css={{
                display: 'grid',
                gridTemplateColumns: '190px 1fr 190px',
                borderTop: `1px solid ${colors?.grey400}`,
                background: colors?.white,
                padding: `${scale(5, true)}px ${scale(2)}px`,
                [md]: {
                    gridTemplateColumns: '1fr',
                    gap: scale(3),
                    padding: 0,
                    paddingTop: scale(3),
                },
            }}
            className={className}
            {...props}
        >
            <Pagination
                pages={pages}
                css={{
                    [mdMin]: {
                        gridColumnStart: 2,
                        gridColumnEnd: 3,
                    },
                }}
                setPage={setPage}
                controlledPage={controlledPage}
            />

            <div
                css={{
                    display: 'flex',
                    alignItems: 'center',
                    marginLeft: 'auto',
                    [mdMin]: {
                        gridColumnStart: 3,
                        gridColumnEnd: 4,
                        justifySelf: 'end',
                    },
                }}
            >
                <Media
                    query={{
                        minWidth: layout?.breakpoints.sm || 768,
                    }}
                    render={() => (
                        <label htmlFor="items-per-page" css={{ marginRight: scale(1) }}>
                            Показывать строк
                        </label>
                    )}
                />

                <Select
                    id="items-per-page"
                    name="items-per-page"
                    selected={ITEMS_PER_PAGE.find(i => i.value === itemsPerPageCount)}
                    onChange={selected => setItemsPerPageCount(Number(selected || 0))}
                    // placement="top"
                    options={ITEMS_PER_PAGE}
                    css={{ width: scale(16) }}
                />
            </div>
        </footer>
    );
};
