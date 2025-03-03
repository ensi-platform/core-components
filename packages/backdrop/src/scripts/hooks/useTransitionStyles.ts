import { useMemo } from 'react';

import type { IBackdropProps } from '../../types';

interface IUseTransitionStyles extends Required<Pick<IBackdropProps, 'timeout'>> {
    override: IBackdropProps['transitionStyles'];
}

export const useTransitionStyles = ({ timeout, override }: IUseTransitionStyles) => {
    const transitionStyle = useMemo(
        () => ({
            preEnter: {
                backgroundColor: 'transparent',
                transition: `background-color ${timeout}ms ease-in`,
            },
            entering: {
                backgroundColor: 'rgba(0, 0, 0, 0.1)',
                transition: `background-color ${timeout}ms ease-in`,
            },
            entered: {
                backgroundColor: 'rgba(0, 0, 0, 0.4)',
                transition: `background-color ${timeout}ms ease`,
            },
            exiting: {
                backgroundColor: 'transparent',
                transition: `background-color ${timeout}ms ease-out`,
            },
            exited: {
                backgroundColor: 'transparent',
            },
            ...override,
        }),
        [timeout, override]
    );

    return transitionStyle;
};
