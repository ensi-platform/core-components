import type { MouseEvent } from 'react';

import type { TInputProps } from '../../types';

export interface IRightAddonsProps {
    rightAddons: TInputProps['rightAddons'];

    /**
     * The clear button is visible
     */
    clear: boolean;

    /**
     * Clear handler
     */
    onClear: (event: MouseEvent<HTMLButtonElement>) => void;
}
