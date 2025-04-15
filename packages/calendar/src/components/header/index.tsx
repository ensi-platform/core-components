import {
    Button,
    IconSmallChevronLeft,
    IconSmallChevronRight,
    defaultTheme,
    scale,
    useLinkCSS,
} from '@ensi-platform/core-components-common';

import type { MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';

import type { SelectorView } from '../../types';

const { colors } = defaultTheme;

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
    const { t } = useTranslation('translation');

    const linkStyles = useLinkCSS('blue');

    return (
        <div aria-live="polite">
            <div css={{ display: 'grid', gridTemplate: '"1fr 1fr 1fr"', alignItems: 'center', height: scale(4) }}>
                <div>
                    {prevArrowVisible && (
                        <Button
                            theme="secondary"
                            onClick={onPrevArrowClick}
                            aria-label={t('translation:prevMonth')}
                            Icon={IconSmallChevronLeft}
                            hidden
                            css={{
                                border: 'none !important',
                                boxShadow: 'none!important',
                                borderRadius: '0!important',
                                padding: `${scale(0)}px!important`,
                                marginLeft: scale(1),
                                marginTop: scale(1),
                                fill: colors.grey900,
                                width: scale(2),
                                height: scale(2),
                                ':hover': {
                                    background: 'none!important',
                                    fill: `${colors.grey900}!important`,
                                },
                            }}
                        >
                            {t('translation:prevMonth')}
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
                            aria-label={t('translation:nextMonth')}
                            Icon={IconSmallChevronRight}
                            hidden
                            css={{
                                border: 'none !important',
                                boxShadow: 'none!important',
                                borderRadius: '0!important',
                                padding: `${scale(0)}px!important`,
                                marginRight: scale(1),
                                marginTop: scale(1),
                                width: scale(2),
                                height: scale(2),
                                fill: colors.grey900,
                                ':hover': {
                                    background: 'none!important',
                                    fill: `${colors.grey900}!important`,
                                },
                            }}
                        >
                            {t('translation:components.nextMonth')}
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
};
