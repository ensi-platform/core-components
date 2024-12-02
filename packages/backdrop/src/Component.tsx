import { type FC, useEffect, useRef } from 'react';
import { useTransition } from 'react-transition-state';

import { useTransitionStyles } from './scripts/hooks';
import type { IBackdropProps } from './types';

export * from './types';

const Backdrop: FC<IBackdropProps> = ({
    children,
    timeout = 200,
    dataTestId,
    zIndex = -1,
    transitionStyles: transitionStylesProp,
    onClose,
    onDestroy,
    isOpen = false,
    invisible = false,
    className,
    ...restProps
}) => {
    const transitionStyles = useTransitionStyles({ timeout, override: transitionStylesProp });

    const [{ isMounted, status }, toggle] = useTransition({
        timeout,
        mountOnEnter: true,
        unmountOnExit: true,
        preEnter: true,
    });

    useEffect(() => {
        toggle(isOpen);
    }, [isOpen, toggle]);

    const onDestroyRef = useRef(onDestroy);
    onDestroyRef.current = onDestroy;

    useEffect(() => {
        if (!isMounted) onDestroyRef.current?.();
    }, [isMounted]);

    if (!isMounted) return null;

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
                    inset: 0,
                    zIndex,
                    WebkitTapHighlightColor: 'transparent',
                    ...(invisible && { opacity: 0 }),
                    ...transitionStyles[status],
                },
            }}
            {...restProps}
        >
            {children}
        </div>
    );
};

export default Backdrop;
