import type { TransitionOptions } from 'react-transition-state';

export const DEFAULT_TRANSITION: TransitionOptions = {
    timeout: 150,
};

/**
 * The minimum size of anchorElement
 * at which the arrow can be offset from the center.
 */
export const MIN_ARROW_SHIFT_SIZE = 75;

export const POSITION_OPTIONS = [
    'top',
    'top-start',
    'top-end',
    'bottom',
    'bottom-start',
    'bottom-end',
    'right',
    'right-start',
    'right-end',
    'left',
    'left-start',
    'left-end',
] as const;
