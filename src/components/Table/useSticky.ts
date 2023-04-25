import { useCallback, useEffect, useRef, useState } from 'react';

const updateSticky = (
    leftAnchorElement: HTMLElement | null,
    horizontalScrollContainer: HTMLElement | null,
    stickyElement: HTMLElement | null
) => {
    if (!leftAnchorElement) return;
    if (!horizontalScrollContainer) return;
    if (!stickyElement) return;

    const { width, top } = leftAnchorElement.getBoundingClientRect();

    const offsetTop = top;

    stickyElement.style.transform = `translateY(${-offsetTop + stickyElement.clientHeight}px)`;
    stickyElement.style.width = `${width}px`;
};

export const useSticky = (enabled = true) => {
    const horizontalScrollContainer = useRef<HTMLDivElement>(null);

    const thead = useRef<HTMLTableSectionElement>(null);

    const leftAnchorElement = useRef<HTMLDivElement>(null);
    const paddingElement = useRef<HTMLTableElement>(null);

    const [isSticky, setSticky] = useState(false);
    const lastIsSticky = useRef(false);
    lastIsSticky.current = isSticky;

    const initialStyles = useRef({
        thead: {
            width: 'initial',
            clientHeight: 0,
        },
    });

    useEffect(() => {
        if (thead.current) {
            initialStyles.current.thead.clientHeight = thead.current.clientHeight;
            initialStyles.current.thead.width = thead.current.style.width;
        }
    }, []);

    const resetStyles = useCallback(() => {
        if (thead.current) {
            thead.current.style.transform = 'none';
            thead.current.style.width = initialStyles.current.thead.width;
        }
    }, []);

    const onVertical = useCallback(() => {
        if (!horizontalScrollContainer.current) return;

        const { top, bottom } = horizontalScrollContainer.current.getBoundingClientRect();

        setSticky(old => {
            if (top <= 0 && bottom > 2 * initialStyles.current.thead.clientHeight) {
                setTimeout(() => {
                    updateSticky(leftAnchorElement.current, horizontalScrollContainer.current, thead.current);
                }, 0);

                if (!old) return true;
            } else if (old) {
                setTimeout(() => resetStyles(), 0);

                return false;
            }

            return old;
        });
    }, [resetStyles]);

    const onHorizontallScroll = useCallback(() => {
        if (!lastIsSticky.current) return;

        updateSticky(leftAnchorElement.current, horizontalScrollContainer.current, thead.current);
    }, []);

    const unsubscribe = useCallback(
        (hor?: HTMLElement) => {
            window.removeEventListener('scroll', onVertical);
            hor?.removeEventListener('scroll', onHorizontallScroll);
        },
        [onHorizontallScroll, onVertical]
    );

    useEffect(() => {
        if (!enabled) {
            unsubscribe(horizontalScrollContainer.current!);
            resetStyles();
        }
    }, [enabled, resetStyles, unsubscribe]);

    useEffect(() => {
        const hor = horizontalScrollContainer.current;
        if (!hor) return;

        window.addEventListener('scroll', onVertical, {
            passive: true,
        });

        hor.addEventListener('scroll', onHorizontallScroll, {
            passive: true,
        });

        return () => unsubscribe(hor);
    }, [onVertical, onHorizontallScroll, unsubscribe]);

    return { isSticky, horizontalScrollContainer, leftAnchorElement, thead, paddingElement };
};
