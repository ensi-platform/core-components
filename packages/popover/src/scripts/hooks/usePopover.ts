import { usePopper } from 'react-popper';
import { ResizeObserver as ResizeObserverPolyfill } from '@juggle/resize-observer';
import { useEffect, useRef, useState } from 'react';

import { RefElement } from '../../types';
import { MIN_ARROW_SHIFT_SIZE } from "..";

export const usePopover = ({
    arrowElement,
    anchorElement,
    popperElement,
    position,
    update,
    open,
    modifiers,
    children,
    toggle,
}) => {
    const [referenceElement, setReferenceElement] = useState<RefElement>(anchorElement);
    const [arrowShift, setArrowShift] = useState(false);

    const updatePopperRef = useRef<() => void>();

    const {
        styles: popperStyles,
        attributes,
        update: updatePopper,
    } = usePopper(referenceElement, popperElement, {
        placement: position,
        modifiers,
    });

    if (updatePopper) {
        updatePopperRef.current = updatePopper;
    }

    useEffect(() => {
        setReferenceElement(anchorElement);
    }, [anchorElement]);

    useEffect(() => {
        if (updatePopper) {
            updatePopper();
        }
    }, [updatePopper, arrowElement, children]);

    if (update && !update.current && updatePopper) {
        // eslint-disable-next-line no-param-reassign
        update.current = updatePopper;
    }

    useEffect(() => {
        // Dirty hack to force popover to fit the anchor position
        const ResizeObserver = window.ResizeObserver || ResizeObserverPolyfill;
        const observer = new ResizeObserver(() => {
            const event = new MouseEvent('mouseover', {
                bubbles: true,
                cancelable: false,
                view: window,
            });

            anchorElement?.dispatchEvent(event);
            updatePopperRef.current?.();
        });

        if (anchorElement) {
            observer.observe(anchorElement);
        }

        return () => {
            observer.disconnect();
        };
    }, [anchorElement]);

    /**
     * По дизайну, если у тултипа позиционирование -start/-end, то стрелочка немного сдвигается вбок.
     * Но если anchorElement слишком маленький, то стрелочка сдвигаться не должна.
     */
    useEffect(() => {
        const shiftedPosition = position.includes('-start') || position.includes('-end');

        if (shiftedPosition && referenceElement) {
            const { width, height } = referenceElement.getBoundingClientRect();

            const size = position.includes('left') || position.includes('right') ? height : width;

            if (size >= MIN_ARROW_SHIFT_SIZE) {
                setArrowShift(true);
            }
        }
    }, [referenceElement, position]);

    useEffect(() => {
        toggle(open);
    }, [open]);

    return {
        referenceElement,
        popperStyles,
        attributes,
        arrowShift,
    };
}
