import { useMemo } from 'react';

import type { IUseFollowCursor } from '../../types';

export const useFollowCursor = ({
    cursorPosition,
    contextmenuFollowCursor,
    target,
    trigger,
    position,
}: IUseFollowCursor) => {
    const cursorOffset = useMemo((): [number, number] | undefined => {
        if (!cursorPosition || !contextmenuFollowCursor || !target || trigger !== 'click') return undefined;

        const targetRect = target.getBoundingClientRect();
        let offsetX = cursorPosition.x - targetRect.left;
        let offsetY = cursorPosition.y - targetRect.bottom;

        if (position?.includes('top')) {
            offsetY = targetRect.top - cursorPosition.y;
        } else if (position?.includes('right')) {
            offsetY = cursorPosition.x - targetRect.right;
            offsetX = cursorPosition.y - targetRect.bottom + targetRect.height / 2;
        } else if (position?.includes('left')) {
            offsetX = cursorPosition.y - targetRect.bottom + targetRect.height / 2;
            offsetY = targetRect.left - cursorPosition.x;
        }

        return [offsetX, offsetY];
    }, [cursorPosition, contextmenuFollowCursor, target, trigger, position]);

    return {
        cursorOffset,
    };
};
