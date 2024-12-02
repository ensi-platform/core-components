import { type ChangeEvent, useCallback } from 'react';
import { useWatch } from 'react-hook-form';

const useCheckFormWatch = (name: string) => {
    let formChecked;

    try {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        formChecked = useWatch({ name });
    } catch (e) {
        console.error('form not found');
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
