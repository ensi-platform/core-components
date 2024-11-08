import type { CSSProperties } from 'react';

import { isValidSize } from '../helpers';

export const useValidateSizes = (sizes: Record<string, CSSProperties['width']>) => {
    const error = (sizeName: string) =>
        new Error(
            `[LoadingSkeleton] invalid ${sizeName} prop value usage. It must be a positive number or a valid CSS size unit.`
        );

    Object.entries(sizes).forEach(([key, value]) => {
        if (!isValidSize(value)) {
            throw error(key);
        }
    });
};
