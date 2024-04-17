import { forwardRef } from 'react';
import { typography, defaultTheme, IconSmallClosed } from '@greensight/core-components-common';
import { scale } from '@greensight/gds';
import { TagProps } from '../types';

const { colors } = defaultTheme;

const Tag = ({ children, onDelete, onClick, disabled, tabIndex = onClick ? 0 : -1, ...props }: TagProps, ref: any) => (
    <button
        {...props}
        tabIndex={tabIndex}
        type="button"
        data-role="tag-button"
        ref={ref}
        onClick={onClick}
        css={{
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
        }}
    >
        {children}
        {onDelete && !disabled && (
            <span
                role="button"
                tabIndex={0}
                css={{ cursor: 'pointer', display: 'flex', flexShrink: 0, flexGrow: 1, ':hover': { opacity: 0.5 } }}
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
                <IconSmallClosed
                    css={{
                        fill: 'currentColor',
                        width: scale(2),
                        height: scale(2),
                        marginLeft: scale(1, true),
                    }}
                />
            </span>
        )}
    </button>
);

export default forwardRef(Tag) as typeof Tag;
