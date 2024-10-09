import React, { FC, useMemo, ClassAttributes, HTMLAttributes } from 'react';
import { CSSObject } from '@emotion/react';
import mergeRefs from 'react-merge-refs';
import deepmerge from 'deepmerge';

import { Popover } from '@greensight/core-components-popover';
import { useThemeCSSPart } from '@greensight/core-components-common';

import { tooltipThemes } from './themes/defaultTheme';
import { useTooltip, DEFAULT_OFFSET, EMPTY_OBJ } from './scripts';
import { ITooltipProps, TooltipThemeStateType } from './types';

const Tooltip: FC<ITooltipProps> = ({
        children,
        content,
        trigger = 'hover',
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
    const { target, visible, contentRef, handleOpen, handleClose, changeTarget } = useTooltip({
        onOpenDelay,
        onCloseDelay,
        forcedOpen,
        trigger,
        onOpen,
        onClose,
    });

    const eventHandlers = trigger === 'hover'
        ? { onMouseEnter: handleOpen, onMouseLeave: handleClose }
        : { onClick: visible ? handleClose : handleOpen };

    const themeState = useMemo<TooltipThemeStateType>(
        () => ({
            targetTag: TargetTag,
            view,
        }),
        [TargetTag, view]
    );

    const getCSS = useThemeCSSPart(theme, themeState);
    const themeContentCSS = useMemo<CSSObject>(() => getCSS('content', themeState), [getCSS, themeState]);
    const themeTargetCSS = useMemo<CSSObject>(() => getCSS('target', themeState), [getCSS, themeState]);

    const getContentProps = (): ClassAttributes<HTMLDivElement> =>
         ({
            ref: contentRef,
            'data-test-id': dataTestId,
            css: deepmerge.all<CSSObject>([themeContentCSS, contentCSS]),
            ...eventHandlers,
        })
    ;

    const getTargetProps = (): HTMLAttributes<HTMLElement> => ({
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
                anchorElement={anchor || target}
                open={visible}
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

export default Tooltip;
