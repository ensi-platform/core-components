/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { Backdrop as DefaultBackdrop } from '@ensi-platform/core-components-backdrop';
import { emptyCSS } from '@ensi-platform/core-components-common';
import { Portal } from '@ensi-platform/core-components-portal';
import { Stack, StackingOrderEnum } from '@ensi-platform/core-components-stack';

import { ResizeObserver as ResizeObserverPolyfill } from '@juggle/resize-observer';

import {
    type KeyboardEvent,
    type MouseEvent,
    forwardRef,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import FocusLock, { AutoFocusInside } from 'react-focus-lock';
import mergeRefs from 'react-merge-refs';
import { useTransition } from 'react-transition-state';

import ComponentDiv from './components/ComponentDiv';
import ContentDiv from './components/ContentDiv';
import DialogDiv from './components/DialogDiv';
import { BaseModalContext } from './context';
import {
    ClosureReasonsEmum,
    TransitionStatusesEnum,
    dialogDivCSS,
    getScrollbarSize,
    handleContainer,
    hasScrollbar,
    isScrolledToBottom,
    isScrolledToTop,
    restoreContainerStyles,
    useTransitionStyles,
} from './scripts';
import type { IBaseModalContext, IBaseModalProps } from './types';

const BaseModal = forwardRef<HTMLDivElement, IBaseModalProps>(
    (
        {
            container,
            children,
            Backdrop = DefaultBackdrop,
            backdropProps = {},
            className,
            contentCSS = emptyCSS,
            wrapperCSS = emptyCSS,
            dataTestId,
            zIndex = StackingOrderEnum.MODAL,
            componentRef = null,
            timeout = 200,
            transitionStyles: transitionStylesProp,
            id,
            scrollHandler = 'wrapper',
            disableBlockingScroll = false,
            disableBackdropClick = false,
            disableEscapeKeyDown = false,
            disableRestoreFocus = false,
            disableFocusLock = false,
            disableAutoFocus = false,
            keepMounted = false,
            open,
            onBackdropClick,
            onEscapeKeyDown,
            onUnmount,
            onMount,
            onClose,
        },
        ref
    ) => {
        const transitionStyles = useTransitionStyles({ timeout, override: transitionStylesProp });

        const [isBackdropDestroyed, setIsBackdropDestroyed] = useState(false);
        const [headerHighlighted, setHeaderHighlighted] = useState(false);
        const [footerHighlighted, setFooterHighlighted] = useState(false);
        const [hasScroll, setHasScroll] = useState(false);
        const [hasHeader, setHasHeader] = useState(false);
        const [hasFooter, setHasFooter] = useState(false);
        const [isExited, setIsExited] = useState(true);
        const [headerOffset, setHeaderOffset] = useState(0);

        const scrollableNodeRef = useRef<HTMLDivElement | null>(null);
        const componentNodeRef = useRef<HTMLDivElement | null>(null);
        const contentNodeRef = useRef<HTMLDivElement | null>(null);
        const mouseDownTarget = useRef<HTMLElement | null>(null);
        const wrapperRef = useRef<HTMLDivElement | null>(null);
        const restoreContainerStylesRef = useRef<(() => void) | null>(null);
        const resizeObserverRef = useRef<ResizeObserver | null>(null);

        const [{ status, isMounted }, toggle] = useTransition({
            timeout,
            unmountOnExit: true,
            mountOnEnter: true,
            preEnter: true,
            preExit: true,
            initialEntered: open,
        });

        useEffect(() => {
            toggle(open);
        }, [open, toggle]);

        const checkToHasScrollBar = () => {
            if (scrollableNodeRef.current) {
                const scrollExists = hasScrollbar(scrollableNodeRef.current);

                // Disable if need to remove shadows/background from footer at bottom of scroll
                setFooterHighlighted(scrollExists);
                setHasScroll(scrollExists);
            }
        };

        useEffect(() => {
            if (open) setIsBackdropDestroyed(false);
        }, [open]);

        const shouldRender = useMemo(
            () => keepMounted || open || !isExited || !isBackdropDestroyed,
            [isBackdropDestroyed, isExited, keepMounted, open]
        );

        const getContainer = useCallback(() => (container ?? document.body) as HTMLElement, [container]);

        const addResizeHandle = useCallback(() => {
            if (!resizeObserverRef.current) return;

            if (scrollableNodeRef.current) {
                resizeObserverRef.current.observe(scrollableNodeRef.current);
            }
            if (contentNodeRef.current) {
                resizeObserverRef.current.observe(contentNodeRef.current);
            }
        }, []);

        const removeResizeHandle = useCallback(() => resizeObserverRef.current?.disconnect(), []);

        const contentRef = useCallback((node: HTMLDivElement) => {
            if (!node) return;

            contentNodeRef.current = node;
            resizeObserverRef.current?.observe(node);
            checkToHasScrollBar();
        }, []);

        const isPropsScrollRef = useMemo(
            () =>
                typeof scrollHandler === 'string' || (typeof scrollHandler === 'object' && 'current' in scrollHandler),
            [scrollHandler]
        );

        const handleScroll = useCallback(() => {
            if (!scrollableNodeRef.current || !componentNodeRef.current) return;

            if (hasHeader) {
                const isScrolled = componentNodeRef.current.getBoundingClientRect().top - headerOffset <= 0;
                setHeaderHighlighted(!isScrolledToTop(scrollableNodeRef.current) && (isScrolled || isPropsScrollRef));
            }

            if (hasFooter) {
                setFooterHighlighted(
                    !isScrolledToBottom(scrollableNodeRef.current) &&
                        componentNodeRef.current.getBoundingClientRect().bottom >= window.innerHeight
                );
            }
        }, [hasFooter, hasHeader, headerOffset, isPropsScrollRef]);

        const handleClose = useCallback<Required<IBaseModalProps>['onClose']>(
            (event, reason) => {
                if (onClose) onClose(event, reason);

                if (reason === ClosureReasonsEmum.backdropClick && onBackdropClick) {
                    onBackdropClick(event as MouseEvent);
                }

                if (reason === ClosureReasonsEmum.escapeKeyDown && onEscapeKeyDown) {
                    onEscapeKeyDown(event as KeyboardEvent);
                }
            },
            [onBackdropClick, onClose, onEscapeKeyDown]
        );

        const handleBackdropMouseDown = useCallback(
            (event: MouseEvent<HTMLElement>) => {
                let clickedOnScrollbar = false;
                const clientWidth = (event.target as HTMLElement)?.clientWidth;

                if (event.clientX && clientWidth) {
                    // Устанавливаем смещение для абсолютно спозиционированного скроллбара в OSX в 17px.
                    const offset = getScrollbarSize() === 0 ? 17 : 0;

                    clickedOnScrollbar = event.clientX + offset > clientWidth;
                }

                if (!disableBackdropClick && !clickedOnScrollbar) {
                    mouseDownTarget.current = event.target as HTMLElement;
                }
            },
            [disableBackdropClick]
        );

        const handleBackdropMouseUp = (event: MouseEvent<HTMLElement>) => {
            if (
                !disableBackdropClick &&
                event.target === wrapperRef.current &&
                mouseDownTarget.current === wrapperRef.current
            ) {
                handleClose(event, 'backdropClick');
            }

            mouseDownTarget.current = null;
        };

        const handleKeyDown = useCallback(
            (event: KeyboardEvent<HTMLDivElement>) => {
                if (event.key !== 'Escape' || disableEscapeKeyDown || !handleClose) return;

                event.stopPropagation();
                handleClose(event, ClosureReasonsEmum.escapeKeyDown);
            },
            [disableEscapeKeyDown, handleClose]
        );

        const getScrollHandler = useCallback(() => {
            if (scrollHandler === 'wrapper') return wrapperRef.current;
            if (scrollHandler === 'content') return componentNodeRef.current;

            return scrollHandler.current || wrapperRef.current;
        }, [scrollHandler]);

        const handleEntered = useCallback(() => {
            scrollableNodeRef.current = getScrollHandler();

            addResizeHandle();

            scrollableNodeRef.current?.addEventListener('scroll', handleScroll);
            if (scrollableNodeRef.current) handleScroll();

            if (onMount) setTimeout(() => onMount(), timeout);
        }, [addResizeHandle, getScrollHandler, handleScroll, onMount, timeout]);

        const handleExited = useCallback(() => {
            removeResizeHandle();
            setIsExited(true);

            scrollableNodeRef.current?.removeEventListener('scroll', handleScroll);
            restoreContainerStylesRef.current?.();

            if (onUnmount) setTimeout(() => onUnmount(), timeout);
        }, [handleScroll, onUnmount, removeResizeHandle, timeout]);

        const handlersRef = useRef({
            entering: handleEntered,
            unmounted: handleExited,
        });
        handlersRef.current.entering = handleEntered;
        handlersRef.current.unmounted = handleExited;

        useEffect(() => {
            if (status === TransitionStatusesEnum.entering) handlersRef.current.entering();
            if (status === TransitionStatusesEnum.unmounted) handlersRef.current.unmounted();
        }, [status]);

        useEffect(() => {
            if (open && isExited) {
                if (!disableBlockingScroll) {
                    const el = getContainer();

                    handleContainer(el);

                    restoreContainerStylesRef.current = () => {
                        restoreContainerStylesRef.current = null;
                        restoreContainerStyles(el);
                    };
                }

                setIsExited(false);
            }
        }, [getContainer, open, disableBlockingScroll, isExited]);

        useEffect(() => {
            const ResizeObserver = window.ResizeObserver || ResizeObserverPolyfill;

            resizeObserverRef.current = new ResizeObserver(checkToHasScrollBar);

            return () => {
                restoreContainerStylesRef.current?.();
                resizeObserverRef.current?.disconnect();
            };
        }, []);

        const contextValue = useMemo<IBaseModalContext>(
            () => ({
                hasHeader,
                hasFooter,
                hasScroll,
                headerHighlighted,
                footerHighlighted,
                headerOffset,
                setHeaderOffset,
                contentRef,
                setHasHeader,
                setHasFooter,
                onClose: handleClose,
            }),
            [
                hasHeader,
                hasFooter,
                hasScroll,
                headerHighlighted,
                footerHighlighted,
                headerOffset,
                contentRef,
                handleClose,
            ]
        );

        return (
            <Stack value={zIndex}>
                {computedZIndex => (
                    <Portal getPortalContainer={container}>
                        <BaseModalContext.Provider value={contextValue}>
                            <FocusLock
                                autoFocus={!disableAutoFocus}
                                disabled={disableFocusLock || !open || !shouldRender}
                                returnFocus={!disableRestoreFocus}
                            >
                                <Backdrop
                                    timeout={timeout}
                                    isOpen={open && shouldRender}
                                    onDestroy={() => setIsBackdropDestroyed(true)}
                                    onClose={() => setIsExited(true)}
                                    zIndex={computedZIndex}
                                    {...backdropProps}
                                />
                                <AutoFocusInside>
                                    {isMounted && (
                                        <DialogDiv
                                            css={{
                                                ...dialogDivCSS,
                                                zIndex: computedZIndex,
                                                ...(!open &&
                                                    isExited &&
                                                    isBackdropDestroyed && {
                                                        display: 'none',
                                                    }),
                                                ...transitionStyles[status],
                                                ...wrapperCSS,
                                            }}
                                            ref={mergeRefs<HTMLDivElement>([ref, wrapperRef])}
                                            handleKeyDown={handleKeyDown}
                                            handleBackdropMouseDown={handleBackdropMouseDown}
                                            handleBackdropMouseUp={handleBackdropMouseUp}
                                            dataTestId={dataTestId}
                                            id={id}
                                        >
                                            <ComponentDiv
                                                className={className}
                                                ref={mergeRefs<HTMLDivElement>([componentRef, componentNodeRef])}
                                            >
                                                <ContentDiv contentCSS={contentCSS}>{children}</ContentDiv>
                                            </ComponentDiv>
                                        </DialogDiv>
                                    )}
                                </AutoFocusInside>
                            </FocusLock>
                        </BaseModalContext.Provider>
                    </Portal>
                )}
            </Stack>
        );
    }
);

export default BaseModal;
