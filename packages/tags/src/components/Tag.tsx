import { forwardRef } from 'react';
import { TagProps } from '../types';

const Tag = (
    { children, onDelete, onClick, disabled, tabIndex = onClick ? 0 : -1, CloseIcon, getCSS, ...props }: TagProps,
    ref: any
) => (
    <button
        {...props}
        tabIndex={tabIndex}
        type="button"
        data-role="tag-button"
        ref={ref}
        onClick={onClick}
        css={getCSS?.('tag')}
    >
        {children}
        {onDelete && !disabled && (
            <span
                role="button"
                tabIndex={0}
                css={getCSS?.('tagCloser')}
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
                {CloseIcon && <CloseIcon />}
            </span>
        )}
    </button>
);

export default forwardRef(Tag) as typeof Tag;
