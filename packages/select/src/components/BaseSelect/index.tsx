import { useMount } from '@ensi-platform/core-components-common';
import { Popover } from '@ensi-platform/core-components-popover';

import { MouseEvent, forwardRef, useCallback, useEffect, useMemo, useRef } from 'react';

import { SelectThemeProvider } from '../../context';
import { SELECT_THEMES } from '../../themes';
import { SelectItem, SelectProps, SelectThemeState } from '../../types';
import { useField, useList, useSelect } from './scripts/hooks';

export const BaseSelect = forwardRef(
    (
        {
            className,
            fieldCSS,
            options: items,
            autocomplete = false,
            multiple = false,
            allowUnselect = true,
            disabled = false,
            closeOnSelect = !multiple,
            defaultOpen = false,
            isOpen: isOpenProp,
            popoverPosition = 'bottom-start',
            preventFlip = false,
            optionsListWidth = 'content',
            name,
            id,
            selected,
            error,
            hint,
            block,
            label,
            placeholder,
            fieldProps = {},
            optionsListProps = {},
            optionProps = {},
            onChange,
            onOpen,
            onFocus,
            onBlur,
            Arrow,
            Field = () => null,
            OptionsList = () => null,
            Option = () => null,
            updatePopover,
            zIndexPopover,
            theme: themeName = 'basic',
            variant = 'primary',
            size = 'md',
            wrap = false,
            hideSelectedOptions,
            emitChangeOnClick,
        }: SelectProps,
        ref
    ) => {
        const {
            isOpen,
            selectedItems,
            getMenuProps,
            getInputProps,
            setSelectedItems,
            getItemProps,
            highlightedIndex,
            toggleMenu,
            openMenu,
            getDropdownProps,
            visibleItems,
        } = useSelect({
            id,
            name,
            items,
            selected,
            hideSelectedOptions,
            allowUnselect,
            closeOnSelect,
            multiple,
            isOpen: isOpenProp,
            emitChangeOnClick,
            onChange,
            onOpen,
        });

        const theme = typeof themeName === 'string' ? SELECT_THEMES[themeName] : themeName;
        const state = useMemo<SelectThemeState>(
            () => ({
                isOpen,
                hasSelected: !!selectedItems.length,
                isSearch: false,
                disabled,
            }),
            [disabled, isOpen, selectedItems.length]
        );

        useEffect(() => {
            if (defaultOpen) openMenu();
        }, [defaultOpen, openMenu]);

        useMount(() => {
            if (isOpenProp) {
                openMenu();
            }
        });

        const wrapperRef = useRef<HTMLDivElement>(null);
        const fieldRef = useRef<HTMLInputElement>(null);
        const listRef = useRef<HTMLDivElement>(null);

        const { comboboxFieldProps, onFieldKeyDown, onFieldFocus, onFieldBlur, onFieldClick } = useField({
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
        });

        const renderValue = useCallback(
            () =>
                selectedItems.map(option => (
                    <input type="hidden" name={name} value={option.label} key={option.label} />
                )),
            [selectedItems, name]
        );

        const getOptionProps = useCallback(
            (option: SelectItem, index: number) => ({
                ...(optionProps as object),
                innerProps: getItemProps({
                    index,
                    item: option,
                    isItemDisabled: option.disabled,
                    onMouseDown: (event: MouseEvent) => event.preventDefault(),
                }),
                multiple,
                index,
                option,
                disabled: option.disabled,
                highlighted: index === highlightedIndex,
                selected: selectedItems.includes(option),
                css: {
                    // TODO: optionCSS from props
                },
            }),
            [getItemProps, highlightedIndex, multiple, optionProps, selectedItems]
        );

        useList({
            listRef,
            wrapperRef,
            selectedItems,
            items,
            isOpen,
            optionsListWidth,
        });

        return (
            <SelectThemeProvider size={size} theme={theme} variant={variant} state={state}>
                <div
                    css={{
                        maxWidth: '100%',
                        position: 'relative',
                        outline: 0,
                        ...(block && { width: '100%' }),
                    }}
                    ref={wrapperRef}
                    {...(disabled && { 'aria-disabled': true })}
                    className={className}
                    onKeyDown={disabled ? undefined : onFieldKeyDown}
                    tabIndex={-1}
                >
                    <Field
                        label={label}
                        error={error}
                        hint={hint}
                        disabled={disabled}
                        isOpen={isOpen}
                        selected={selectedItems}
                        setSelectedItems={setSelectedItems}
                        toggleMenu={toggleMenu}
                        wrap={wrap}
                        placeholder={placeholder}
                        Arrow={Arrow && <Arrow disabled={disabled} />}
                        css={fieldCSS}
                        innerProps={{
                            onBlur: onFieldBlur,
                            onFocus: disabled ? undefined : onFieldFocus,
                            onClick: disabled ? undefined : onFieldClick,
                            tabIndex: disabled ? -1 : 0,
                            ref: comboboxFieldProps.ref,
                            id: comboboxFieldProps.id,
                            'aria-labelledby': comboboxFieldProps['aria-labelledby'],
                            'aria-controls': comboboxFieldProps['aria-controls'],
                            'aria-autocomplete': autocomplete ? comboboxFieldProps['aria-autocomplete'] : undefined,
                        }}
                        {...fieldProps}
                    />
                    {name && renderValue()}

                    <Popover
                        open={isOpen}
                        anchorElement={fieldRef.current as HTMLElement}
                        position={popoverPosition}
                        preventFlip={preventFlip}
                        popperCSS={{
                            boxShadow: 'none',
                            border: 'none',
                            borderRadius: 0,
                            position: 'relative',
                        }}
                        update={updatePopover}
                        zIndex={zIndexPopover}
                    >
                        <div {...getMenuProps({ ref: listRef }, { suppressRefError: true })}>
                            <OptionsList
                                {...optionsListProps}
                                isOpen={isOpen}
                                options={visibleItems}
                                Option={Option}
                                getOptionProps={getOptionProps}
                            />
                        </div>
                    </Popover>
                </div>
            </SelectThemeProvider>
        );
    }
);

BaseSelect.displayName = 'BaseSelect';
