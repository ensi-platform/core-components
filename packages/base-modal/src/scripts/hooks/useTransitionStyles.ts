import { useMemo } from 'react';

import type { IBaseModalProps } from '../../types';

interface IUseTransitionStyles extends Required<Pick<IBaseModalProps, 'timeout'>> {
    override: IBaseModalProps['transitionStyles'];
}

export const useTransitionStyles = ({ timeout, override }: IUseTransitionStyles) => {
    const transitionStyle = useMemo(
        () => ({
            preEnter: {
                opacity: 0,
                transform: 'scale(0.85)',
                transition: `transform ${timeout * 1.5}ms ease-in, opacity ${timeout}ms ease-in`,
            },
            entering: {
                opacity: 1,
                transform: 'scale(1)',
                transition: `transform ${timeout * 1.5}ms ease-out, opacity ${timeout}ms ease-in`,
            },
            entered: {
                opacity: 1,
                transform: 'scale(1)',
                transition: `transform ${timeout * 1.5}ms ease-out, opacity ${timeout}ms ease`,
            },
            exiting: {
                opacity: 0,
                transform: 'scale(0.85)',
                transition: `transform ${timeout * 1.5}ms ease-out, opacity ${timeout}ms ease-in`,
            },
            exited: {
                opacity: 0,
            },
            ...override,
        }),
        [timeout, override]
    );

    return transitionStyle;
};
