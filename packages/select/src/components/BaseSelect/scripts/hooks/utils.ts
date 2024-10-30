import { SelectItem, SelectProps } from '../../../../types';

export const isOptionShape = (item: SelectItem | string | null): item is SelectItem =>
    !!item && Object.prototype.hasOwnProperty.call(item, 'label');

// За один проход делает список пунктов меню плоским и находит выбранные пункты по ключу
export function processOptions(options: SelectProps['options'], selected: SelectProps['selected'] = []) {
    const flatOptions: SelectItem[] = [];
    const unselectedItems: SelectItem[] = [];

    const selectedArray = Array.isArray(selected) ? selected : [selected];
    const selectedItems = selectedArray.filter(isOptionShape);
    const selectedKeys = selectedArray.filter((option): option is string => typeof option === 'string');

    const allSelectedKeys = selectedArray
        .map(option => {
            if (typeof option === 'string') return option;
            if (typeof option === 'object' && option && 'label' in option) return option.label;

            return undefined;
        })
        .filter(e => e !== undefined);

    const isSelected = (option: SelectItem) => selectedKeys.includes(option.label);
    const isAllSelected = (option: SelectItem) => allSelectedKeys.includes(option.label);

    const process = (option: SelectItem) => {
        flatOptions.push(option);

        if (isSelected(option)) {
            selectedItems.push(option);
        }

        if (!isAllSelected(option)) {
            unselectedItems.push(option);
        }
    };

    options.forEach(option => {
        process(option);
    });

    return { flatOptions, selectedItems, unselectedItems };
}
