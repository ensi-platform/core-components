import { TransitionOptions, TransitionStatus } from 'react-transition-state';

export const extractTransitionDuration = (status: TransitionStatus, options: TransitionOptions) => {
    if (status === 'unmounted') return 0;
    if (typeof options.timeout === 'number' || !options.timeout) return options.timeout || 0;

    if (status === 'exited' || status === 'exiting') return options.timeout.exit || 0;

    return options.timeout.enter || 0;
};
