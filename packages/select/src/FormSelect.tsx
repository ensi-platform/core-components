import { forwardRef, useMemo } from 'react';

import { Select } from './Select';
import { SelectItem, SelectProps } from './types';

export const FormSelect = forwardRef<
    HTMLDivElement,
    Omit<SelectProps, 'selected'> & {
        value: (string | number) | (string | number)[];
    }
>(({ multiple, options: items, error, onChange, value, ...props }, ref) => {
    const selectedValues = useMemo(() => (Array.isArray(value) ? value : [value]), [value]);

    const selectedItems = useMemo(
        () =>
            items.filter(e => {
                if ('value' in e) {
                    return selectedValues.includes(e.value!);
                }
                return false;
            }) as SelectItem[],
        [items, selectedValues]
    );

    return (
        <Select
            ref={ref}
            options={items}
            {...props}
            multiple={multiple}
            error={error}
            selected={selectedItems}
            onChange={onChange}
        />
    );
});

FormSelect.displayName = 'FormSelect';
