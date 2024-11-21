import type { CSSObject } from '@emotion/react';

export const getDecimalPrecision = (num: number) => {
    const decimalPart = num.toString().split('.')[1];
    return decimalPart ? decimalPart.length : 0;
};

export const roundValueToPrecision = (value: number, precision: number) => {
    if (value == null) {
        return value;
    }

    const nearest = Math.round(value / precision) * precision;
    return Number(nearest.toFixed(getDecimalPrecision(precision)));
};

export function clamp(
    val: number,
    min: number = Number.MIN_SAFE_INTEGER,
    max: number = Number.MAX_SAFE_INTEGER
): number {
    return Math.max(min, Math.min(val, max));
}

export const VISUALLY_HIDDEN_CSS: CSSObject = {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    whiteSpace: 'nowrap',
    width: 1,
};
