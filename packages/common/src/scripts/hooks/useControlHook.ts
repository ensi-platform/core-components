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

export const useSimpleControlHookRHF = <T>(name: string, propsOnChange: (e: { target: { value: T } }) => void) => {
    const value = useWatch({ name });
    const handleChange = useCallback(
        (newValue: T, e?: ChangeEvent<HTMLInputElement>) => {
            const patchedEvent = e ? { ...e } : undefined;
            if (patchedEvent) {
                patchedEvent.target.value = newValue as string;
                patchedEvent.currentTarget.value = newValue as string;
            }

            propsOnChange(
                (e as any) || {
                    target: {
                        value: newValue,
                    },
                    currentTarget: {
                        value: newValue,
                    },
                }
            );
        },
        [propsOnChange]
    );

    return {
        value,
        handleChange,
    };
};

export type useCheckboxLikeControlHookType = typeof useCheckboxLikeControlHookRHF;
export type useSimpleControlHookType = typeof useSimpleControlHookRHF;
