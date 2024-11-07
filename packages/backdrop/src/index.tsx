import { type FC, useEffect, useRef } from 'react';
import { useTransition } from 'react-transition-state';

import type { BackdropProps } from './types';

export * from './types';

export const Backdrop: FC<BackdropProps> = ({
    className,
    open = false,
    invisible = false,
    timeout = 200,
    children,
    onClose,
    dataTestId,
    onDestroy,
    zIndex,
    styles = {
        preEnter: {
            backgroundColor: 'transparent',
            transition: `background-color ${timeout}ms ease-in`,
        },
        entering: {
            backgroundColor: 'transparent',
            transition: `background-color ${timeout}ms ease-in`,
        },
        entered: {
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            transition: `background-color ${timeout}ms ease`,
        },
        exiting: {
            backgroundColor: 'transparent',
            transition: `background-color ${timeout}ms ease-out`,
        },
        exited: {
            backgroundColor: 'transparent',
        },
    },
    ...restProps
}) => {
    const [{ isMounted, status }, toggle] = useTransition({
        timeout,
        mountOnEnter: true,
        unmountOnExit: true,
    });

    useEffect(() => {
        toggle(open);
    }, [open]);

    const onDestroyRef = useRef(onDestroy);
    onDestroyRef.current = onDestroy;

    useEffect(() => {
        if (!isMounted) onDestroyRef.current?.();
    }, [isMounted]);

    if (!isMounted && !children) return null;

    return (
        <div
            aria-hidden
            onClick={onClose}
            data-test-id={dataTestId}
            className={className}
            css={{
                '&::after': {
                    content: '""',
                    position: 'fixed',
                    top: 0,
                    right: 0,
                    left: 0,
                    bottom: 0,
                    zIndex: open && children ? zIndex : -1,
                    WebkitTapHighlightColor: 'transparent',
                    ...(invisible && { opacity: 0 }),
                    ...styles[status],
                },
            }}
            {...restProps}
        >
            {children}
        </div>
    );
};
