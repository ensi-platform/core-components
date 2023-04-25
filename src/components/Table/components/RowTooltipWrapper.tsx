import { Row } from '@tanstack/react-table';
import { FC, ReactNode, useEffect, useState } from 'react';
import { followCursor } from 'tippy.js';

import Tooltip from '@components/Tooltip';
import { ContentBtn } from '@components/Tooltip/ContentBtn';

import { Layout, scale } from '@scripts/gds';

import TipIcon from '@icons/small/status/tip.svg';

import { TooltipItem, TrProps } from '../types';
import { DefaultTr } from './utils';

const RowTooltipWrapper = ({
    Tr = DefaultTr,
    row,
    getTooltipForRow,
    children,
}: {
    row?: Row<any>;
    children: ReactNode | ReactNode[];
    getTooltipForRow: (row: Row<any>) => TooltipItem[];
    Tr?: FC<TrProps<any>>;
}) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const callback = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setVisible(false);
        };
        if (visible) {
            document.addEventListener('keydown', callback);
        }
        return () => {
            document.removeEventListener('keydown', callback);
        };
    }, [setVisible, visible]);

    const tooltipContent = getTooltipForRow(row!);

    return (
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
            <Tr
                row={row}
                onContextMenu={e => {
                    e.preventDefault();
                    setVisible(true);
                }}
            >
                {children}
            </Tr>
        </Tooltip>
    );
};

export default RowTooltipWrapper;
