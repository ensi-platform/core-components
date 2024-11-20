import type { IBaseModalProps } from '@ensi-platform/core-components-base-modal';

import { useMemo } from 'react';

import type { IDrawerProps } from '../../types';

// interface IUseTransitionStyles
//     extends Required<Pick<IBaseModalProps, 'timeout'>>,
//         Required<Pick<IDrawerProps, 'placement'>> {
//     override: IBaseModalProps['transitionStyles'];
// }

interface IUseTransitionStyles
    extends Required<Pick<IBaseModalProps, 'timeout'>>,
        Required<Pick<IDrawerProps, 'placement'>> {}

export const useTransitionStyles = ({ timeout, placement }: IUseTransitionStyles) => {
    const transitionStyle = useMemo(
        () => ({
            preEnter: {
                transform: `translateX(${placement === 'left' ? '-100%' : '100%'})`,
            },
            entering: {
                transform: 'translateX(0)',
                transition: `transform ${timeout}ms ease-out`,
            },
            entered: {
                transform: 'translateX(0)',
                transition: `transform ${timeout}ms ease-out`,
            },
            exiting: {
                transform: `translateX(${placement === 'left' ? '-100%' : '100%'})`,
                transition: `transform ${timeout * 2}ms ease-out`,
            },
            exited: {
                transform: `translateX(${placement === 'left' ? '-100%' : '100%'})`,
            },
        }),
        [timeout, placement]
    );

    return transitionStyle;
};
