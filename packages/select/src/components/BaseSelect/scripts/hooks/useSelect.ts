import {
    type UseMultipleSelectionProps,
    type UseMultipleSelectionState,
    useCombobox,
    useMultipleSelection,
} from 'downshift';
import { useMemo, useRef } from 'react';

import { type SelectItem, type SelectProps } from '../../../../types';
import { processOptions } from './utils';

const itemToString = (option: SelectItem | null) => (option ? option.label : '');

export const useSelect = ({
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
}: {
    id: SelectProps['id'];
    name: SelectProps['name'];
    items: SelectProps['options'];
    selected: SelectProps['selected'];
    hideSelectedOptions: SelectProps['hideSelectedOptions'];
    allowUnselect: SelectProps['allowUnselect'];
    closeOnSelect: SelectProps['closeOnSelect'];
    multiple: SelectProps['multiple'];
    isOpen: SelectProps['isOpen'];
    emitChangeOnClick: SelectProps['emitChangeOnClick'];
    onChange: SelectProps['onChange'];
    onOpen: SelectProps['onOpen'];
}) => {
    const actionItemRef = useRef<SelectItem | null>(null);

    const { selectedItems, unselectedItems } = useMemo(() => processOptions(items, selected), [items, selected]);

    const MultipleSelectionProps = {
        itemToString,
        onSelectedItemsChange: changes => {
            if (onChange) {
                const value = changes.selectedItems?.length ? (changes.selectedItems as SelectItem[]) : null;
                onChange(
                    {
                        target: {
                            value,
                        },
                    },
                    {
                        name,
                        actionItem: actionItemRef.current,
                        selected: value,
                    }
                );

                actionItemRef.current = null;
            }
        },
        stateReducer: (state, actionAndChanges) => {
            const { type, changes } = actionAndChanges;

            if (!allowUnselect && type === useMultipleSelection.stateChangeTypes.DropdownKeyDownBackspace) {
                return state;
            }

            return changes as UseMultipleSelectionState<SelectItem>;
        },
        ...(selected !== undefined && {
            selectedItems,
        }),
    } as UseMultipleSelectionProps<SelectItem>;

    if (selected !== undefined) {
        MultipleSelectionProps.selectedItems = selectedItems;
    }

    const {
        selectedItems: selectedItemsCombobox,
        addSelectedItem,
        setSelectedItems,
        removeSelectedItem,
        getDropdownProps,
    } = useMultipleSelection(MultipleSelectionProps);

    const visibleItems = useMemo(
        () => (hideSelectedOptions && Array.isArray(selected) ? unselectedItems : items),
        [hideSelectedOptions, items, selected, unselectedItems]
    );

    const { isOpen, getMenuProps, getInputProps, getItemProps, highlightedIndex, toggleMenu, openMenu } =
        useCombobox<SelectItem>({
            id,
            isOpen: isOpenProp,
            items: visibleItems,
            itemToString,
            defaultHighlightedIndex: selectedItemsCombobox.length === 0 ? -1 : undefined,
            onIsOpenChange: changes => {
                if (onOpen) {
                    /**
                     *  Вызываем обработчик асинхронно.
                     *
                     * Иначе при клике вне открытого селекта сначала сработает onOpen, который закроет селект,
                     * А затем сработает onClick кнопки открытия\закрытия с isOpen=false и в итоге селект откроется снова.
                     */
                    setTimeout(() => {
                        onOpen({
                            open: changes.isOpen,
                            name,
                        });
                    }, 0);
                }
            },
            scrollIntoView(node) {
                setTimeout(() => {
                    node?.scrollIntoView({
                        block: 'nearest',
                        inline: 'nearest',
                    });
                }, 0);
            },
            stateReducer: (state, actionAndChanges) => {
                const { type, changes } = actionAndChanges;
                const { selectedItem } = changes;
                switch (type) {
                    case useCombobox.stateChangeTypes.InputKeyDownEnter:
                    case useCombobox.stateChangeTypes.ItemClick:
                        if (selectedItem !== undefined) {
                            actionItemRef.current = selectedItem;
                        }

                        if (selectedItem && !selectedItem.disabled) {
                            const alreadySelected = selectedItemsCombobox.includes(selectedItem);
                            const allowRemove = allowUnselect || (multiple && selectedItemsCombobox.length > 1);

                            if (alreadySelected && allowRemove) {
                                removeSelectedItem(selectedItem);
                            }

                            if (!alreadySelected) {
                                if (multiple) {
                                    addSelectedItem(selectedItem);
                                } else {
                                    setSelectedItems([selectedItem]);
                                }
                            }

                            if (alreadySelected && !multiple && emitChangeOnClick) {
                                setSelectedItems([selectedItem]);
                            }
                        }

                        return {
                            ...changes,
                            isOpen: !closeOnSelect,
                            // при closeOnSelect === false - сохраняем подсвеченный индекс
                            highlightedIndex:
                                state.isOpen && !closeOnSelect ? state.highlightedIndex : changes.highlightedIndex,
                        };
                    default:
                        return changes;
                }
            },
        });

    return {
        isOpen,
        selectedItems: selectedItemsCombobox,
        setSelectedItems,
        getMenuProps,
        getInputProps,
        getItemProps,
        highlightedIndex,
        toggleMenu,
        openMenu,
        getDropdownProps,
        visibleItems,
    };
};
