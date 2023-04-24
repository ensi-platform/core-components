/* eslint-disable no-use-before-define */
import type { CSSObject } from '@emotion/core';
import type { FC, MouseEvent, ReactElement, ReactNode } from 'react';

// TODO: port select
// import type { BaseSelectProps } from '@controls/future/Select';
import type { BaseThemeState, BreakpointParam, StyleDefinition } from '@scripts/gds';

// eslint-disable-next-line import/no-cycle
import { TABS_THEMES } from './themes';

export type SelectedId = string | number;

export type TabsMatchMedia = 'desktop' | 'mobile';

export enum TabsSize {
    md = 'md',
}

export enum TabsVariant {
    primary = 'primary',
}

export interface ShowMoreButtonOption {
    key: any;
    value: SelectedId;
    content: ReactNode;
}

export interface ShowMoreButtonProps {
    // extends Omit<
    //     BaseSelectProps,
    //     | 'Field'
    //     | 'placeholder'
    //     | 'Arrow'
    //     | 'autocomplete'
    //     | 'size'
    //     | 'onFocus'
    //     | 'selected'
    //     | 'closeOnSelect'
    //     | 'multiple'
    //     | 'fieldProps'
    //     | 'hint'
    //     | 'options'
    //     | 'allowUnselect'
    // >
    onChange?: any;
    options: ShowMoreButtonOption[];
    count: number;
    ['data-collapse']?: 'true';
}

export interface TabsState {
    isMobile: boolean;

    /**
     * При скроле табы будут уходить в край экрана
     */
    fullWidthScroll?: boolean;

    /**
     * Рендерить заголовки табов в контейнере со скроллом
     */
    scrollable?: boolean;

    /**
     * Сворачивает не помещающиеся в окне табы в PickerButton
     */
    collapsible?: boolean;
}

export type TabsThemeState = BaseThemeState<typeof TabsVariant, typeof TabsSize, never> & TabsState;

export type TabsTheme = {
    container: StyleDefinition<TabsThemeState>;
    scrollableContainer: StyleDefinition<TabsThemeState>;
    tabList: StyleDefinition<TabsThemeState>;
    line: StyleDefinition<TabsThemeState>;
    tab: StyleDefinition<TabsThemeState & { hidden?: boolean }>;
    toggle: StyleDefinition<
        TabsThemeState & {
            isSelected?: boolean;
            disabled?: boolean;
            focused?: boolean;
            isOption?: boolean;
            isCollapsed?: boolean;
        }
    >;
    showMoreButton: StyleDefinition<TabsThemeState>;
    toggleRightAddons: StyleDefinition<TabsThemeState>;
    toggleLeftAddons: StyleDefinition<TabsThemeState>;
};

export type TabsProps = Partial<Omit<BaseThemeState<typeof TabsVariant, typeof TabsSize, TabsTheme>, 'theme'>> &
    Partial<TabsState> & {
        theme?: TabsTheme | keyof typeof TABS_THEMES;

        breakpoint?: BreakpointParam;

        prefix?: string;

        /**
         * Дополнительный класс
         */
        className?: string;

        /**
         * Дополнительный стиль контейнера
         */
        containerCSS?: CSSObject;

        /**
         * Id активного таба
         */
        selectedId?: SelectedId;

        /**
         * Рендерить неактивные табы
         */
        keepMounted?: boolean;

        /**
         * Режим отображения по умолчанию
         */
        defaultMatch?: TabsMatchMedia;

        /**
         * Список табов, для контроля переноса вкладок в PickerButton
         */
        collapsedTabsIds?: string[];

        /**
         * Компоненты табов
         */
        children: Array<ReactElement<TabProps>> | ReactElement<TabProps>;

        /**
         * Компонент заголовков табов
         */
        TabList: FC<TabListProps>;

        /**
         * Компонент заголовков табов
         */
        ShowMoreButton?: FC<ShowMoreButtonProps>;

        /**
         * Обработчик переключения табов
         */
        onChange?: (event: MouseEvent, payload: { selectedId: SelectedId }) => void;

        /**
         * Идентификатор для систем автоматизированного тестирования
         */
        dataTestId?: string;
    };

export type TabProps = {
    /**
     * Id таба
     */
    id: SelectedId;

    /**
     * Заголовок таба
     */
    title: string | ReactNode;

    /**
     * Дополнительный класс для контейнера содержимого таба
     */
    className?: string;

    /**
     * Дополнительный стиль для кнопки таба
     */
    toggleCSS?: CSSObject;

    /**
     * Блокирует таб
     */
    disabled?: boolean;

    /**
     * Управление видимостью таба
     */
    hidden?: boolean;

    /**
     * Рендерить таб, если он неактивен
     */
    keepMounted?: boolean;

    /**
     * Контент таба
     */
    children?: ReactNode;

    /**
     * Слот справа
     */
    rightAddons?: ReactNode;

    /**
     * Слот слева
     */
    leftAddons?: ReactNode;

    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;

    unfocusable?: boolean;
} & (
    | {
          /**
           * Кастомный рендер тайтла
           */
          renderTitle?: (props: TabListTitle) => ReactNode;
          unfocusable?: boolean;
      }
    | {
          renderTitle?: never;
          unfocusable?: never;
      }
);

export type TabListTitle = {
    title: string;
    id: SelectedId;
    disabled?: boolean;
    rightAddons?: ReactNode;
    leftAddons?: ReactNode;
    hidden?: boolean;
    toggleCSS?: CSSObject;
    selected?: boolean;
    collapsed?: boolean;

    focused?: boolean;
    isOption?: boolean;
} & (
    | {
          renderTitle?: TabProps['renderTitle'];
          unfocusable?: boolean;
      }
    | {
          renderTitle?: never;
          unfocusable?: never;
      }
);

export type TabListProps = Pick<
    TabsProps,
    | 'className'
    | 'containerCSS'
    | 'defaultMatch'
    | 'selectedId'
    | 'scrollable'
    | 'collapsible'
    | 'collapsedTabsIds'
    | 'onChange'
    | 'dataTestId'
> & {
    /**
     * Заголовки табов
     */
    titles?: TabListTitle[];
    /**
     * Контрольная точка, с нее начинается desktop версия
     */
    breakpoint?: BreakpointParam;

    ShowMoreButton?: FC<ShowMoreButtonProps>;
};

export type UseTabsProps = TabListProps;
