import { IconSmallClosed, defaultTheme, scale } from '@ensi-platform/core-components-common';

import { forwardRef, useMemo } from 'react';

import { ITagProps } from '../types';

const { colors, typography } = defaultTheme;

/**
 * Nameplate with close button
 */
const TagItem = (
    {
        disabled,
        onDelete,
        onClick,
        CloseIcon = IconSmallClosed,
        tabIndex = onClick ? 0 : -1,
        children,
        css: buttonCss,
        closerCss,
        ...props
    }: ITagProps,
    ref: any
) => {
    const buttonCSS = useMemo(
        () => ({
            cursor: onClick ? 'pointer' : 'default',
            padding: `2px ${scale(1)}px`,
            overflow: 'hidden',
            minHeight: scale(3),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: colors.white,
            border: `1px solid ${colors.grey400}`,
            color: colors.black,
            ...(disabled && {
                opacity: 0.5,
                background: colors.grey200,
            }),
            ':hover': {
                background: colors.lightBlue,
            },
            ...typography('bodySm'),

            ...buttonCss,
        }),
        [buttonCss, disabled, onClick]
    );

    const closeButtonCSS = useMemo(
        () => ({
            cursor: 'pointer',
            display: 'flex',
            flexShrink: 0,
            flexGrow: 1,
            ':hover': { opacity: 0.5 },
            svg: {
                fill: 'currentColor',
                width: scale(2),
                height: scale(2),
                marginLeft: scale(1, true),
            },
            ...closerCss,
        }),
        [closerCss]
    );

    return (
        <button
            {...props}
            type="button"
            data-role="tag-button"
            ref={ref}
            css={buttonCSS}
            tabIndex={tabIndex}
            onClick={onClick}
        >
            {children}

            {onDelete && !disabled && (
                <span
                    role="button"
                    tabIndex={0}
                    css={closeButtonCSS}
                    title="Удалить"
                    onClick={e => {
                        e.stopPropagation();
                        onDelete?.();
                    }}
                    onKeyDown={event => {
                        if ([' ', 'Enter'].includes(event.key)) {
                            event.stopPropagation();
                            onDelete?.();
                        }
                    }}
                >
                    <CloseIcon />
                </span>
            )}
        </button>
    );
};

export default forwardRef(TagItem) as typeof TagItem;
