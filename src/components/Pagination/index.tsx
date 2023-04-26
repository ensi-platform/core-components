import { CSSObject } from '@emotion/core';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { Button, colors, scale, typography } from '@scripts/gds';

import ChevronLeft from '@icons/arrow-left.svg';
import ChevronRight from '@icons/arrow-right.svg';

export interface PaginationProps {
    /** Number of pages */
    pages: number;
    /** Base number of visible pages */
    baseNumberPages?: number;
    scrollToTop?: boolean;
    className?: string;
    /** for navigation from parent, not query */
    controlledPage?: number;
    /** for controlled from state variation */
    setPage?: (value: number) => void;
    /** for custom disabling */
    disabled?: boolean;
}

const imitationLink: CSSObject = {
    '&:disabled': {
        background: 'none !important',
    },
    '&:hover': {
        fill: colors?.primaryHover,
        background: 'none !important',
    },
};

const Pagination = ({
    pages,
    baseNumberPages = 7,
    scrollToTop = false,
    className,
    controlledPage,
    setPage,
    disabled,
}: PaginationProps) => {
    const { pathname, query } = useRouter();

    const page = controlledPage || +(query.page || 1);

    const getParams = (newPage: number) => ({
        pathname,
        query: {
            ...query,
            page: newPage,
        },
    });

    const buttonCSS: CSSObject = {
        width: scale(4),
        height: scale(4),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
    };

    const liCSS: CSSObject = {
        width: scale(4),
        height: scale(4),
        display: 'block',
        alignItems: 'center',
        justifyContent: 'center',
        a: buttonCSS,
    };

    // Находим средний элемент для корректного подсчета отклонений
    const centerIndex = Math.ceil(baseNumberPages / 2);

    // В реальном проекте следует заменять значениями констант, например enums
    const determinePosition = () => {
        if (pages > baseNumberPages) {
            if (page < centerIndex) return 'start';

            if (page > pages - centerIndex + 1) return 'end';

            return 'center';
        }
        return 'any';
    };

    const position = determinePosition();

    // Подсчет отображаемых страниц (отображаем либо максимально возможное, либо в зависимости от положения активной страницы)
    // eslint-disable-next-line
    const visiblePages = position === 'any' ? pages : position === 'center' ? baseNumberPages : baseNumberPages - 1;

    // Функция определяет номер страницы для каждого элемента массива (подсчет ведется от 1го)
    const getItem = (pageNumber: number) => {
        if (position === 'any') return pageNumber;

        if (pageNumber === 1) return pageNumber;

        if (pageNumber === visiblePages) return pages;

        if ((pageNumber === 2 && position !== 'start') || (pageNumber === visiblePages - 1 && position !== 'end')) {
            return null;
        }

        if (position === 'center') {
            return page + pageNumber - centerIndex;
        }

        if (position === 'end') {
            return pages + pageNumber - visiblePages;
        }

        if (position === 'start') {
            return pageNumber;
        }
        return undefined;
    };

    const paginationArray = Array.from({ length: visiblePages }, (_, i) => getItem(i + 1));

    if (pages < 2) return null;

    return (
        <ul css={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} className={className}>
            <li css={liCSS}>
                {setPage ? (
                    <Button
                        theme="ghost"
                        size="sm"
                        Icon={ChevronLeft}
                        onClick={() => {
                            setPage(page - 1);
                        }}
                        disabled={page === 1 || disabled}
                        css={{
                            height: '100%',
                            marginRight: scale(1),
                            ...(page === 1 && {
                                fill: colors?.grey600,
                                pointerEvents: 'none',
                            }),
                            ...imitationLink,
                        }}
                    >
                        {' '}
                    </Button>
                ) : (
                    <Link href={getParams(page - 1)} scroll={scrollToTop} passHref>
                        <a
                            css={{
                                ...buttonCSS,
                                ...(page === 1 && {
                                    fill: colors?.grey600,
                                    pointerEvents: 'none',
                                }),
                                '&:hover': {
                                    fill: colors?.primaryHover,
                                },
                            }}
                        >
                            <ChevronLeft />
                        </a>
                    </Link>
                )}
            </li>

            {paginationArray.map((item, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <li key={index} css={{ ...typography('button'), ...liCSS }}>
                    {
                        // eslint-disable-next-line no-nested-ternary
                        item ? (
                            // eslint-disable-next-line no-nested-ternary
                            item === page ? (
                                <span
                                    css={{
                                        ...buttonCSS,
                                        ...typography('bodySm'),
                                        fill: colors?.grey900,
                                        border: `1px solid ${colors?.primary}`,
                                        borderRadius: '2px',
                                        cursor: 'default',
                                    }}
                                >
                                    {item}
                                </span>
                            ) : setPage ? (
                                <Button
                                    theme="ghost"
                                    onClick={() => {
                                        setPage(item);
                                    }}
                                    disabled={disabled}
                                    // @ts-ignore
                                    css={{
                                        ...buttonCSS,
                                        '&:hover': {
                                            background: 'none !important',
                                            border: `1px solid ${colors?.primary}`,
                                        },
                                        fontWeight: '400 !important',
                                    }}
                                >
                                    {item}
                                </Button>
                            ) : (
                                <Link href={getParams(item)} scroll={scrollToTop} passHref>
                                    <a
                                        css={{
                                            ...typography('bodySm'),
                                            ...buttonCSS,
                                            borderRadius: '2px',
                                            border: `1px solid transparent`,
                                            '&:hover': {
                                                border: `1px solid ${colors?.primaryHover}`,
                                            },
                                        }}
                                    >
                                        {item}
                                    </a>
                                </Link>
                            )
                        ) : (
                            <span css={typography('bodySm')}>...</span>
                        )
                    }
                </li>
            ))}

            <li css={{ ...liCSS }}>
                {setPage ? (
                    <Button
                        theme="ghost"
                        size="sm"
                        Icon={ChevronRight}
                        onClick={() => {
                            setPage(page + 1);
                        }}
                        disabled={page === pages || disabled}
                        css={{
                            height: '100%',
                            marginLeft: scale(1),
                            ...(page === pages && {
                                fill: colors?.grey600,
                                pointerEvents: 'none',
                            }),
                            ...imitationLink,
                        }}
                    >
                        {' '}
                    </Button>
                ) : (
                    <Link href={getParams(page + 1)} scroll={scrollToTop} passHref>
                        <a
                            css={{
                                ...buttonCSS,
                                ...(page === pages && {
                                    fill: colors?.grey600,
                                    pointerEvents: 'none',
                                }),
                                '&:hover': {
                                    fill: colors?.primaryHover,
                                },
                            }}
                        >
                            <ChevronRight />
                        </a>
                    </Link>
                )}
            </li>
        </ul>
    );
};

export default Pagination;
