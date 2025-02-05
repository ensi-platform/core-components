import { type ChangeEvent, useCallback } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

const useCheckFormWatch = (name: string) => {
    const context = useFormContext();
    let formChecked;

    if (context) {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        formChecked = useWatch({ name });
    }

    return formChecked;
};

export const useCheckboxLikeControlHookRHF = (
    name: string,
    propsOnChange: (e: ChangeEvent<HTMLInputElement>) => void,
    propsChecked?: boolean
) => {
    const formChecked = useCheckFormWatch(name);

    const handleChange = useCallback(
        (e?: ChangeEvent<HTMLInputElement>, newChecked = false) => {
            propsOnChange(
                (e as any) || {
                    target: {
                        checked: newChecked,
                    },
                    currentTarget: {
                        checked: newChecked,
                    },
                }
            );
        },
        [propsOnChange]
    );

    return {
        checked: typeof propsChecked === 'boolean' ? propsChecked : Boolean(formChecked),
        handleChange,
    };
};

export type useCheckboxLikeControlHookType = typeof useCheckboxLikeControlHookRHF;
