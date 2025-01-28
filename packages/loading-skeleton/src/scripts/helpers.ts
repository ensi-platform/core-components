import type { CSSProperties } from 'react';

export const sizeRegexp = /^\d+(\.\d+)?(px|pt|cm|mm|in|%|em|rem|vh|vw|vmin|vmax)?$/;

export const prepareSize = (size: string) => {
    if (size) return !Number.isNaN(Number(size)) ? `${size}px` : size;
};

export const isValidSize = (size: CSSProperties['width']) => {
    if (typeof size === 'number') return !Number.isNaN(size) || size >= 0;
    if (size === undefined || size === '') return true;
    return sizeRegexp.test(size);
};

export const prepareCount = (count: number) => {
    const floor = Math.floor(count);
    const rest = count - floor;
    const counts = new Array(floor).fill(1);

    return rest ? [...counts, rest] : counts;
};
