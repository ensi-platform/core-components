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
     * Expand scrollable container to full width
     */
    fullWidthScroll?: boolean;

    /**
     * Render tabs heading inside scrollable container
     */
    scrollable?: boolean;

    /**
     * Collapse tabs, which cannot fit, inside PickerButton
     */
    collapsible?: boolean;
}

export interface ITabsProps
    extends Partial<Omit<BaseThemeState<typeof TabsVariant, typeof TabsSize, TabsThemeType>, 'theme'>>,
        Partial<ITabsState> {
    /**
     * GDS theme
     */
    theme?: TabsThemeType | keyof typeof TABS_THEMES;

    /* Width breakpoint after which it renders desktop version
     * @default md
     */
    breakpoint?: number;

    /**
     * Use it if you have multiple tabs lists on one page
     */
    prefix?: string;

    /**
     * Additional class
     */
    className?: string;

    /**
     * Additional container class
     */
    containerCSS?: CSSObject;

    /**
     * Id of active tab
     */
    selectedId?: SelectedIdType;

    /**
     * Should render inactive tabs
     */
    keepMounted?: boolean;

    /**
     * Default appearance
     */
    defaultMatch?: TabsMatchMediaType;

    /**
     * List of tab ids, which should be collapsed inside PickerButton
     */
    collapsedTabsIds?: string[];

    /**
     * List of ```Tab``` components
     */
    children: ReactNode; // Array<ReactElement<TabProps>> | ReactElement<TabProps>;

    /**
     * Tab heading component
     */
    TabHeadingList: FC<ITabHeadingListProps>;

    /**
     * Custom 'Show more' button component
     */
    ShowMoreButton?: FC<IShowMoreButtonProps>;

    /**
     * Tab change event handler
     */
    onChange?: (event: MouseEvent, payload: { selectedId: SelectedIdType }) => void;

    /**
     * Id for automatic testing
     */
    dataTestId?: string;

    /**
     * Array of errors within each tab
     */
    countErrors?: { id: string; count: number }[];
}

export type TabPropsType = {
    /**
     * Tab id
     */
    id: SelectedIdType;

    /**
     * Tabs title
     */
    title: string;

    /**
     * Additional class for container of tab content
     */
    className?: string;

    /**
     * Additional style for tab button
     */
    toggleCSS?: CSSObject;

    /**
     * Disable tab
     */
    disabled?: boolean;

    /**
     * Visually hide tab
     */
    hidden?: boolean;

    /**
     * Render tab even if its inactive
     */
    keepMounted?: boolean;

    /**
     * Tab content
     */
    children?: ReactNode;

    /**
     * Right addon inside tab heading
     */
    rightAddons?: ReactNode;

    /**
     * Left addon inside tab heading
     */
    leftAddons?: ReactNode;

    /**
     * Id for automatic tests
     */
    dataTestId?: string;

    /**
     * Don't highlight active tab heading
     */
    unfocusable?: boolean;
} & (
    | {
          /**
           * Custom tab heading
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

export interface ITabHeadingListProps
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
     * Tabs titles
     */
    titles?: TabListTitleType[];
    /**
     * Width breakpoint after which it renders desktop version
     * @default md
     */
    breakpoint?: number;

    ShowMoreButton?: FC<IShowMoreButtonProps>;
}

export type UseTabsProps = ITabHeadingListProps;
