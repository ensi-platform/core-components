import { useThemeCSSPart } from '@ensi-platform/core-components-common';
import { Popover } from '@ensi-platform/core-components-popover';

import type { CSSObject } from '@emotion/react';

import deepmerge from 'deepmerge';
import React, {
    type ClassAttributes,
    type FC,
    type HTMLAttributes,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import mergeRefs from 'react-merge-refs';

import { tooltipThemes } from './themes/defaultTheme';
import type { TooltipProps, TooltipThemeState, Trigger } from './types';

export * from './types';

const DEFAULT_OFFSET: [number, number] = [0, 16];

const EMPTY_OBJ: CSSObject = {};

export const Tooltip: FC<TooltipProps> = ({
    children,
    content,
    trigger: propsTrigger = 'hover',
    onCloseDelay = 300,
    onOpenDelay = 300,
    dataTestId,
    open: forcedOpen,
    offset = DEFAULT_OFFSET,
    position,
    contentCSS = EMPTY_OBJ,
    arrowCSS = EMPTY_OBJ,
    className,
    updatePopover,
    targetCSS = EMPTY_OBJ,
    targetTag: TargetTag = 'div',
    zIndex,
    onClose,
    onOpen,
    getPortalContainer,
    view = 'tooltip',
    targetRef = null,
    fallbackPlacements,
    preventOverflow = true,
    availableHeight = false,
    anchor = null,
    useAnchorWidth,
    theme = tooltipThemes.basic,
}) => {
    const [trigger, setTrigger] = useState<Trigger>('click');

    useEffect(() => {
        setTimeout(() => {
            setTrigger(propsTrigger || 'hover');
        }, 100);
    }, [propsTrigger]);

    const [visible, setVisible] = useState(!!forcedOpen);
    const [target, setTarget] = useState<HTMLElement | null>(null);

    const contentRef = useRef<HTMLDivElement | null>(null);
    const timer = useRef(0);

    const show = forcedOpen === undefined ? visible : forcedOpen;

    const open = useCallback(() => {
        if (!show) {
            setVisible(true);

            if (onOpen) {
                onOpen();
            }
        }
    }, [onOpen, show]);

    const close = useCallback(() => {
        if (show) {
            setVisible(false);

            if (onClose) {
                onClose();
            }
        }
    }, [onClose, show]);

    const toggle = useCallback(() => {
        if (show) {
            close();
        } else {
            open();
        }
    }, [close, open, show]);

    const clickedOutside = useCallback(
        (node: Element): boolean => {
            if (target && target.contains(node)) {
                return false;
            }

            if (contentRef.current && contentRef.current.contains(node)) {
                return false;
            }

            return true;
        },
        [target]
    );

    useEffect(() => {
        const handleBodyClick = (event: MouseEvent | TouchEvent) => {
            const eventTarget = event.target as Element;

            if (clickedOutside(eventTarget)) {
                close();
            }
        };

        document.body.addEventListener('click', handleBodyClick);
        document.body.addEventListener('touchstart', handleBodyClick);

        return () => {
            document.body.removeEventListener('click', handleBodyClick);
            document.body.removeEventListener('touchstart', handleBodyClick);

            clearTimeout(timer.current);
        };
    }, [clickedOutside, close]);

    const handleTargetClick = useCallback(() => {
        toggle();
    }, [toggle]);

    const handleMouseOver = useCallback(() => {
        clearTimeout(timer.current);

        timer.current = window.setTimeout(() => {
            open();
        }, onOpenDelay);
    }, [onOpenDelay, open]);

    const handleMouseOut = useCallback(() => {
        clearTimeout(timer.current);

        timer.current = window.setTimeout(() => {
            close();
        }, onCloseDelay);
    }, [close, onCloseDelay]);

    const handleTouchStart = useCallback(
        (event: React.TouchEvent<HTMLElement>) => {
            const eventTarget = event.target as Element;

            clearTimeout(timer.current);

            if (clickedOutside(eventTarget)) {
                timer.current = window.setTimeout(() => {
                    close();
                }, onCloseDelay);
            } else {
                open();
            }
        },
        [clickedOutside, close, onCloseDelay, open]
    );

    const onClickProps = { onClick: handleTargetClick };

    const onHoverProps = {
        onMouseOver: handleMouseOver,
        onMouseOut: handleMouseOut,
        onTouchStart: handleTouchStart,
    };

    const themeState = useMemo<TooltipThemeState>(
        () => ({
            targetTag: TargetTag,
            view,
        }),
        [TargetTag, view]
    );

    const getCSS = useThemeCSSPart(theme, themeState);

    const themeContentCSS = useMemo<CSSObject>(() => getCSS('content', themeState), [getCSS, themeState]);
    const themeTargetCSS = useMemo<CSSObject>(() => getCSS('target', themeState), [getCSS, themeState]);

    const getTargetProps = (): HTMLAttributes<HTMLElement> => {
        const props = {
            css: deepmerge.all<CSSObject>([themeTargetCSS, targetCSS]),
        };

        switch (trigger) {
            case 'click':
                return {
                    ...props,
                    ...onClickProps,
                };
            case 'hover':
                return {
                    ...props,
                    ...onHoverProps,
                };
            default:
                return {};
        }
    };

    const getContentProps = (): ClassAttributes<HTMLDivElement> => {
        const props = {
            ref: contentRef,
            'data-test-id': dataTestId,
            css: deepmerge.all<CSSObject>([themeContentCSS, contentCSS]),
        };

        switch (trigger) {
            case 'hover':
                return {
                    ...props,
                    ...onHoverProps,
                };
            default:
                return props;
        }
    };

    return (
        <>
            <TargetTag ref={mergeRefs([targetRef, setTarget])} {...getTargetProps()}>
                {children.props.disabled && (
                    <div
                        css={{
                            // overlap
                            cursor: 'not-allowed',
                            position: 'absolute',
                            height: '100%',
                            width: '100%',
                            zIndex: 2,
                        }}
                    />
                )}
                {children}
            </TargetTag>

            <Popover
                anchorElement={anchor || target}
                open={show}
                getPortalContainer={getPortalContainer}
                arrowCSS={arrowCSS}
                popperCSS={{}}
                className={className}
                offset={offset}
                withArrow
                position={position}
                update={updatePopover}
                zIndex={zIndex}
                fallbackPlacements={fallbackPlacements}
                preventOverflow={preventOverflow}
                availableHeight={availableHeight}
                useAnchorWidth={useAnchorWidth}
            >
                <div {...getContentProps()}>{content}</div>
            </Popover>
        </>
    );
};
