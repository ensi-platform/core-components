import { FocusEvent, ForwardedRef, KeyboardEvent, MouseEvent, RefObject } from 'react';

import mergeRefs from 'react-merge-refs';

import { SelectProps } from '../../../../types';
import { useSelect } from './useSelect';

type useSelectReturnType = ReturnType<typeof useSelect>;

export const useField = ({
    ref,
    listRef,
    fieldRef,

    highlightedIndex,
    getInputProps,
    getDropdownProps,
    openMenu,
    toggleMenu,

    onFocus,
    onBlur,
    autocomplete,
    isOpen,
}: {
    ref: ForwardedRef<unknown>;
    listRef: RefObject<HTMLDivElement>;
    fieldRef: RefObject<HTMLInputElement>;

    highlightedIndex: useSelectReturnType['highlightedIndex'];
    getInputProps: useSelectReturnType['getInputProps'];
    getDropdownProps: useSelectReturnType['getDropdownProps'];
    openMenu: useSelectReturnType['openMenu'];
    toggleMenu: useSelectReturnType['toggleMenu'];

    onFocus: SelectProps['onFocus'];
    onBlur: SelectProps['onBlur'];

    autocomplete: SelectProps['autocomplete'];
    isOpen: SelectProps['isOpen'];
}) => {
    const fieldProps = getInputProps(getDropdownProps({ ref: mergeRefs([ref, fieldRef]) }));

    const onFieldFocus = (event: FocusEvent<HTMLDivElement | HTMLInputElement>) => {
        if (onFocus) onFocus(event);

        if (autocomplete && !isOpen) {
            openMenu();
        }
    };

    const onFieldBlur = (event: FocusEvent<HTMLDivElement | HTMLInputElement>) => {
        const isNextFocusInsideList = listRef.current?.contains(
            (event.relatedTarget || document.activeElement) as HTMLElement
        );
        if (!isNextFocusInsideList) {
            // if (onBlur) { // TODO теряется реф поля ввода
            //     onBlur(event);
            // }

            fieldProps.onBlur?.(event);
        }
    };

    const onFieldClick = (event: MouseEvent) => {
        if (autocomplete && (event.target as HTMLElement).tagName.toUpperCase() === 'INPUT') {
            openMenu();
        } else {
            toggleMenu();
        }
    };

    const onFieldKeyDown = (event: KeyboardEvent<HTMLDivElement | HTMLInputElement>) => {
        fieldProps.onKeyDown?.(event);
        if (autocomplete && !isOpen && (event.key.length === 1 || event.key === 'Backspace')) {
            // Для автокомплита - открываем меню при начале ввода
            openMenu();
        }

        if (
            [' ', 'Enter'].includes(event.key) &&
            !autocomplete &&
            (event.target as HTMLElement).tagName !== 'INPUT' &&
            (event.target as HTMLElement).tagName !== 'BUTTON'
        ) {
            // Открываем\закрываем меню по нажатию enter или пробела
            event.preventDefault();
            if (!isOpen || highlightedIndex === -1) toggleMenu();
        }
    };

    return { comboboxFieldProps: fieldProps, onFieldKeyDown, onFieldFocus, onFieldBlur, onFieldClick };
};
