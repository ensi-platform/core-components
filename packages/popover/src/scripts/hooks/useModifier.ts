import { useMemo } from 'react';
import maxSize from 'popper-max-size-modifier';
import { ModifierArguments, Obj } from '@popperjs/core';

import { IPopperModifier } from '../../types';

export const useModifier = (
    {
        withArrow,
        preventFlip,
        fallbackPlacements,
        preventOverflow,
        availableHeight,
        offset,
        arrowElement,
    }
) => {
    const availableHeightModifier = useMemo(
        () => ({
            name: 'availableHeight',
            enabled: true,
            phase: 'beforeWrite',
            requires: ['maxSize'],
            fn({
                state: {
                    modifiersData,
                    elements: { popper },
                },
            }: ModifierArguments<Obj>) {
                const { height } = modifiersData.maxSize;

                const content = popper.querySelector('.scrollable-content') as HTMLElement;

                if (content && !content.style.maxHeight) {
                    content.style.maxHeight = `${height}px`;
                }
            },
        }),
        []
    );

    const result: IPopperModifier[] = [{ name: 'offset', options: { offset } }];

    if (withArrow) {
        result.push({ name: 'arrow', options: { element: arrowElement } });
    }

    if (preventFlip) {
        result.push({ name: 'flip', options: { fallbackPlacements: [] } });
    }

    if (fallbackPlacements) {
        result.push({ name: 'flip', options: { fallbackPlacements } });
    }

    if (preventOverflow) {
        result.push({
            name: 'preventOverflow',
            options: { mainAxis: false },
        });
    }

    if (availableHeight) {
        result.push({ ...maxSize, options: {} });
        result.push({ ...availableHeightModifier, options: {} });
    }

    return result;
};
