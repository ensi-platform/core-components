import type {
    ChangeEvent,
    FocusEvent,
    ForwardRefExoticComponent,
    KeyboardEvent,
    MouseEvent,
    PropsWithoutRef,
    RefAttributes,
    RefObject,
    Ref,
} from 'react';

import type { CalendarProps } from '@greensight/core-components-calendar';
import type { InputProps } from '@greensight/core-components-input';
import type { PopoverProps } from '@greensight/core-components-popover';
import { CSSObject } from '@emotion/react';

export type View = 'date' | 'date-time' | 'date-range' | 'time';

export type DateTemplate = {
    segments: string[];
    separators: string[];
};

export type DateSegments<T = string> = {
    day: T;
    month: T;
    year: T;
    hours: T;
    minutes: T;
};

export interface BaseCalendarInputProps extends Omit<InputProps, 'onChange' | 'wrapperRef'> {
    /**
     * Автоматическое исправление ввода
     *  @default true
     */
    autoCorrection?: boolean;

    /**
     * Значение даты. Намеренно предлагается в форме хранить строковое представление
     * а в нужных местах парсить. Позволяет писать правильные валидации:
     * 1) на пустую строку
     * 2) на невалидную дату
     * 3) на дату вне допустимого предела (уже через парсинг)
     */
    value?: string;

    /**
     * Минимальная дата, доступная для выбора (timestamp)
     */
    minDate?: number;

    /**
     * Максимальная дата, доступная для выбора (timestamp)
     */
    maxDate?: number;

    /**
     * Вид компонента
     */
    view: View;

    /**
     * Мобильный или десктопный вид компонента
     */
    platform: 'desktop' | 'mobile';

    /**
     * Открыть календарь при клике
     */
    picker?: boolean;

    /**
     *  Компонент календаря
     */
    Calendar?: ForwardRefExoticComponent<PropsWithoutRef<CalendarProps> & RefAttributes<HTMLDivElement>>;

    /**
     *  Пропсы календаря
     */
    calendarProps?: Omit<CalendarProps, 'open' | 'minDate' | 'maxDate' | 'onClose'>;

    /**
     * Пропсы поповера
     */
    popoverProps?: PopoverProps;

    /**
     * Ref для обертки input
     */
    inputWrapperRef?: Ref<HTMLDivElement> | null;

    /**
     *  Обработчик открытия календаря
     */
    onCalendarOpen?: () => void;

    /**
     *  Обработчик закрытия календаря
     */
    onCalendarClose?: () => void;

    /**
     * Обработчик клика на иконку календаря
     */
    onPickerClick?: (event: MouseEvent) => void;

    /**
     * Обработчик изменения значения
     */
    onChange?: (event: ChangeEvent<HTMLInputElement> | null, payload: { value: string }) => void;
}

export interface InnerDateInputProps extends Omit<BaseCalendarInputProps, 'view'> {
    closeOnClickOutside?: boolean;

    /**
     * Флаг, открыт ли календарь
     */
    open: boolean;

    /**
     * Дополнительный класс обертки
     */
    wrapperCSS?: CSSObject;

    /**
     * Дата со временем
     */
    withTime?: boolean;

    /**
     * Реф календаря
     */
    calendarRef: RefObject<HTMLDivElement>;

    /**
     * Обработчики на враппер
     */
    wrapperHandlers?: {
        onClick?: (e: MouseEvent<HTMLDivElement>) => void;
        onFocus?: (e: FocusEvent<HTMLDivElement>) => void;
        onBlur: (e: FocusEvent<HTMLDivElement>) => void;
        onKeyDown?: (e: KeyboardEvent<HTMLDivElement>) => void;
    };

    /**
     * Обработчик окончания ввода
     */
    onComplete?: (value: string, date: Date) => void;
}

export interface InnerDateRangeInputProps extends Omit<InnerDateInputProps, 'onComplete'> {
    /**
     * Тип выбора границ в календаре
     * @default clarification
     */
    rangeBehavior?: 'clarification' | 'reset';

    /**
     * Обработчик окончания ввода
     */
    onComplete?: (value: string, dateFrom: Date, dateTo: Date) => void;
}

export interface InnerTimeInputProps extends Omit<InputProps, 'onChange'> {
    /**
     * Автоматическое исправление ввода
     *  @default true
     */
    autoCorrection?: BaseCalendarInputProps['autoCorrection'];

    /**
     * Обработчик изменения значения
     */
    onChange?: BaseCalendarInputProps['onChange'];

    /**
     * Обработчик окончания ввода
     */
    onComplete?: (value: string) => void;
}

type PrivateProps =
    | 'platform'
    | 'withTime'
    | 'open'
    | 'calendarRef'
    | 'inputWrapperRef'
    | 'wrapperHandlers'
    | 'onPickerClick';

type Never<T> = {
    [P in keyof T]?: never;
};

type Prettify<T> = {
    [K in keyof T]: T[K];
  } & {};

type WithPickerRequiredProps = Prettify<Required<Pick<BaseCalendarInputProps, 'Calendar'>>>;

type WithPickerNotRequiredProps = Prettify<Pick<
    BaseCalendarInputProps,
    'calendarProps' | 'popoverProps' | 'onCalendarOpen' | 'onCalendarClose'
>>;

type WithPickerProps = Prettify<WithPickerRequiredProps & WithPickerNotRequiredProps>;
type NoPickerProps = Prettify<Never<WithPickerRequiredProps> & Never<WithPickerProps>>;

export type CalendarInputConditionalProps =
    // date
    | ({ view: 'date'; picker: true } & WithPickerProps & Pick<InnerDateInputProps, 'onComplete' | 'wrapperCSS'>)
    | ({ view: 'date'; picker?: false } & NoPickerProps & Pick<InnerDateInputProps, 'onComplete' | 'wrapperCSS'>)

    // date-time
    | ({ view: 'date-time'; picker: true } & WithPickerProps &
          Pick<InnerDateInputProps, 'onComplete' | 'wrapperCSS'>)
    | ({ view: 'date-time'; picker?: false } & NoPickerProps &
          Pick<InnerDateInputProps, 'onComplete' | 'wrapperCSS'>)

    // date-range
    | ({
          view: 'date-range';
          picker: true;
      } & WithPickerProps &
          Pick<InnerDateRangeInputProps, 'onComplete' | 'wrapperCSS' | 'rangeBehavior'>)
    | ({ view: 'date-range'; picker?: false } & NoPickerProps &
          Pick<InnerDateRangeInputProps, 'onComplete' | 'wrapperCSS'>)

    // time
    | ({ view: 'time'; picker?: never; minDate?: never; maxDate?: never; Calendar?: never } & Pick<
          InnerTimeInputProps,
          'onComplete'
      >);

export type CalendarInputProps = Omit<BaseCalendarInputProps, PrivateProps | keyof WithPickerProps> &
    CalendarInputConditionalProps;