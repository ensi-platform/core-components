import { useThemeCSSPart } from '@ensi-platform/core-components-common';
import { Popover } from '@ensi-platform/core-components-popover';

import type { CSSObject } from '@emotion/react';

import deepmerge from 'deepmerge';
import { type FC, type HTMLAttributes, type MouseEvent, type Ref, useMemo } from 'react';
import mergeRefs from 'react-merge-refs';

import { DEFAULT_OFFSET, EMPTY_OBJ, useTooltip } from './scripts';
import { tooltipThemes } from './themes/defaultTheme';
import { type ITooltipProps, type TooltipThemeStateType } from './types';

interface ExtendedDivAttributes extends HTMLAttributes<HTMLDivElement> {
    css?: CSSObject;
    'data-test-id'?: string;
    ref?: Ref<HTMLDivElement>;
}

const Tooltip: FC<ITooltipProps> = ({
    children,
    content,
    trigger = 'hover',
    onCloseDelay = 300,
    onOpenDelay = 300,
    dataTestId,
    open: forcedOpen = false,
    offset = DEFAULT_OFFSET,
    position,
    contentCSS = EMPTY_OBJ,
    withArrow,
    arrowCSS = EMPTY_OBJ,
    className,
    updatePopover,
    targetCSS = EMPTY_OBJ,
    targetTag: TargetTag = 'div',
    zIndex,
    onClose,
    onOpen,
    getPortalContainer,
    targetRef = null,
    fallbackPlacements,
    preventOverflow = true,
    availableHeight = false,
    anchorElement = null,
    useAnchorWidth,
    theme = tooltipThemes.basic,
    popperCSS,
}) => {
    const { target, visible, contentRef, handleOpen, handleClose, changeTarget } = useTooltip({
        onOpenDelay,
        onCloseDelay,
        forcedOpen,
        trigger,
        onOpen,
        onClose,
    });

    const eventHandlers =
        trigger === 'hover'
            ? // After the component loads, an auto-generated onMouseEnter is triggered.
              // I can't find the source.
              // I found 'e.isTrusted' solution to the problem.
              {
                  onMouseEnter: (e: MouseEvent<HTMLElement>) => {
                      if (e.isTrusted) handleOpen();
                  },
                  onMouseLeave: handleClose,
              }
            : { onClick: visible ? handleClose : handleOpen };

    const themeState = useMemo<TooltipThemeStateType>(
        () => ({
            targetTag: TargetTag,
        }),
        [TargetTag]
    );

    const getCSS = useThemeCSSPart(theme, themeState);
    const themeContentCSS = useMemo<CSSObject>(() => getCSS('content', themeState), [getCSS, themeState]);
    const themeTargetCSS = useMemo<CSSObject>(() => getCSS('target', themeState), [getCSS, themeState]);

    const getContentProps = (): ExtendedDivAttributes => ({
        ref: contentRef,
        'data-test-id': dataTestId,
        css: deepmerge.all<CSSObject>([themeContentCSS, contentCSS]),
        ...eventHandlers,
    });

    const getTargetProps = (): HTMLAttributes<HTMLElement> & { css?: CSSObject } => ({
        css: deepmerge.all<CSSObject>([themeTargetCSS, targetCSS]),
        ...eventHandlers,
    });

    return (
        <>
            <TargetTag ref={mergeRefs([targetRef, changeTarget])} {...getTargetProps()}>
                {children.props.disabled && (
                    <div
                        css={{
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
                anchorElement={anchorElement || target}
                open={visible}
                getPortalContainer={getPortalContainer}
                arrowCSS={arrowCSS}
                popperCSS={popperCSS}
                className={className}
                offset={offset}
                withArrow={withArrow}
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

export default Tooltip;
