/* eslint-disable no-use-before-define */
import type { BaseThemeState } from '@ensi-platform/core-components-common';
import type { SelectProps } from '@ensi-platform/core-components-select';

import type { CSSObject } from '@emotion/react';

import type { FC, MouseEvent, ReactElement, ReactNode } from 'react';

import type { TABS_THEMES } from '../themes';
import type { TabsSize, TabsThemeType, TabsVariant } from './themes';

export type SelectedIdType = any;

export type TabsMatchMediaType = 'desktop' | 'mobile';

export interface IShowMoreButtonOption {
    label: string;
    value: SelectedIdType;
    content: ReactNode;
}

export interface IShowMoreButtonProps
    extends Omit<
        SelectProps,
        | 'Field'
        | 'placeholder'
        | 'Arrow'
        | 'autocomplete'
        | 'size'
        | 'onFocus'
        | 'selected'
        | 'closeOnSelect'
        | 'multiple'
        | 'fieldProps'
        | 'hint'
        | 'options'
        | 'allowUnselect'
    > {
    options: IShowMoreButtonOption[];
    count: number;
    ['data-collapse']?: 'true';
}

export interface ITabsState {
    mobile: boolean;

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

export interface ITabsProps
    extends Partial<Omit<BaseThemeState<typeof TabsVariant, typeof TabsSize, TabsThemeType>, 'theme'>>,
        Partial<ITabsState> {
    theme?: TabsThemeType | keyof typeof TABS_THEMES;

    breakpoint?: number;

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
    selectedId?: SelectedIdType;

    /**
     * Рендерить неактивные табы
     */
    keepMounted?: boolean;

    /**
     * Режим отображения по умолчанию
     */
    defaultMatch?: TabsMatchMediaType;

    /**
     * Список табов, для контроля переноса вкладок в PickerButton
     */
    collapsedTabsIds?: string[];

    /**
     * Компоненты табов
     */
    children: ReactNode; // Array<ReactElement<TabProps>> | ReactElement<TabProps>;

    /**
     * Компонент заголовков табов
     */
    TabList: FC<ITabListProps>;

    /**
     * Компонент заголовков табов
     */
    ShowMoreButton?: FC<IShowMoreButtonProps>;

    /**
     * Обработчик переключения табов
     */
    onChange?: (event: MouseEvent, payload: { selectedId: SelectedIdType }) => void;

    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    dataTestId?: string;

    /**
     * Массив, который нужен для вывода количества ошибок у таба
     */
    countErrors?: { id: string; count: number }[];
}

export type TabPropsType = {
    /**
     * Id таба
     */
    id: SelectedIdType;

    /**
     * Заголовок таба
     */
    title: string;

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
          renderTitle?: (props: TabListTitleType) => ReactElement;
          unfocusable?: boolean;
      }
    | {
          renderTitle?: never;
          unfocusable?: never;
      }
);

export type TabListTitleType = {
    title: string;
    id: SelectedIdType;
    disabled?: boolean;
    rightAddons?: ReactNode;
    leftAddons?: ReactNode;
    hidden?: boolean;
    toggleCSS?: CSSObject;
    selected?: boolean;
    collapsed?: boolean;

    focused?: boolean;
    isOption?: boolean;

    countErrors: number;
} & (
    | {
          renderTitle?: TabPropsType['renderTitle'];
          unfocusable?: boolean;
      }
    | {
          renderTitle?: never;
          unfocusable?: never;
      }
);

export interface ITabListProps
    extends Pick<
        ITabsProps,
        | 'className'
        | 'containerCSS'
        | 'defaultMatch'
        | 'selectedId'
        | 'scrollable'
        | 'collapsible'
        | 'collapsedTabsIds'
        | 'onChange'
        | 'dataTestId'
    > {
    /**
     * Заголовки табов
     */
    titles?: TabListTitleType[];
    /**
     * Контрольная точка, с нее начинается desktop версия
     * @default md
     */
    breakpoint?: number;

    ShowMoreButton?: FC<IShowMoreButtonProps>;
}

export type UseTabsProps = ITabListProps;
