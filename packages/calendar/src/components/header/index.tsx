import { MouseEvent } from 'react';

import {
    useLinkCSS,
    Button,
    scale,
    IconSmallChevronLeft,
    IconSmallChevronRight,
} from '@greensight/core-components-common';

import { SelectorView } from '../../types';

export type HeaderProps = {
    /**
     * Выбранный месяц
     */
    month?: string;

    /**
     * Выбранный год
     */
    year?: string;

    /**
     * Вид шапки — месяц и год или только месяц
     */
    view?: SelectorView;

    /**
     * Отображать тень? (нужна при прокрутке)
     */
    // eslint-disable-next-line react/no-unused-prop-types
    withShadow?: boolean;

    /**
     * Показывать кнопку переключения на пред. месяц?
     */
    prevArrowVisible?: boolean;

    /**
     * Показывать кнопку переключения на след. месяц?
     */
    nextArrowVisible?: boolean;

    /**
     * Обработчик нажатия кнопки переключения на пред. месяц
     */
    onPrevArrowClick?: (event: MouseEvent<HTMLButtonElement>) => void;

    /**
     * Обработчик нажатия кнопки переключения на след. месяц
     */
    onNextArrowClick?: (event: MouseEvent<HTMLButtonElement>) => void;

    /**
     * Обработчик нажатия на кнопку месяца
     */
    onMonthClick?: (event: MouseEvent<HTMLButtonElement>) => void;

    /**
     * Обработчик нажатия на кнопку года
     */
    onYearClick?: (event: MouseEvent<HTMLButtonElement>) => void;
};

export const Header = ({
    month,
    year,
    view = 'full',
    prevArrowVisible = true,
    nextArrowVisible = true,
    onPrevArrowClick,
    onNextArrowClick,
    onMonthClick,
    onYearClick,
}: HeaderProps) => {
    const linkStyles = useLinkCSS('blue');

    return (
        <div aria-live="polite">
            <div css={{ display: 'grid', gridTemplate: '"1fr 1fr 1fr"', alignItems: 'center', height: scale(4) }}>
                <div>
                    {prevArrowVisible && (
                        <Button
                            theme="secondary"
                            onClick={onPrevArrowClick}
                            aria-label="Предыдущий месяц"
                            Icon={IconSmallChevronLeft}
                            hidden
                            css={{
                                border: 'none !important',
                                boxShadow: 'none!important',
                                borderRadius: '0!important',
                                padding: `${scale(0)}px!important`,
                                marginLeft: scale(1),
                                marginTop: scale(1),
                                ':hover': {
                                    background: 'none!important',
                                },
                            }}
                        >
                            Предыдущий месяц
                        </Button>
                    )}
                </div>

                {view === 'full' ? (
                    <div css={{ display: 'flex', justifyContent: 'center' }}>
                        <button onClick={onMonthClick} type="button" css={{ ...linkStyles, marginRight: scale(1) }}>
                            {month}
                        </button>

                        <button onClick={onYearClick} type="button" css={linkStyles}>
                            {year}
                        </button>
                    </div>
                ) : (
                    <span css={linkStyles}>{month}</span>
                )}

                <div css={{ justifySelf: 'end' }}>
                    {nextArrowVisible && (
                        <Button
                            theme="secondary"
                            onClick={onNextArrowClick}
                            aria-label="Следующий месяц"
                            Icon={IconSmallChevronRight}
                            hidden
                            css={{
                                border: 'none !important',
                                boxShadow: 'none!important',
                                borderRadius: '0!important',
                                padding: `${scale(0)}px!important`,
                                marginRight: scale(1),
                                marginTop: scale(1),
                                ':hover': {
                                    background: 'none!important',
                                },
                            }}
                        >
                            Следующий месяц
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
};
