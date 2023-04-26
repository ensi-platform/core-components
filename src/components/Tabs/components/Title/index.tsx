import { ButtonHTMLAttributes, ReactNode, forwardRef } from 'react';

import { useTabsTheme } from '../../context';
import { TabListTitle } from '../../types';

type Props = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'id' | 'title'> & {
    title: ReactNode;
} & Omit<TabListTitle, 'title'>;

export const Title = forwardRef<HTMLButtonElement, Props>(
    (
        {
            id,
            toggleCSS,
            title,
            rightAddons = null,
            leftAddons = null,
            hidden = false,
            selected = false,
            disabled = false,
            collapsed = false,
            focused = false,
            isOption = false,
            ...restProps
        },
        ref
    ) => {
        delete restProps.renderTitle;
        delete restProps.unfocusable;

        const { getCSS } = useTabsTheme();

        if (hidden) return null;

        return (
            <button
                {...restProps}
                ref={ref}
                disabled={disabled}
                type="button"
                id={`${id}`}
                css={{
                    ...(getCSS('toggle', {
                        disabled,
                        isSelected: selected,
                        focused,
                        isOption,
                        isCollapsed: collapsed && !isOption,
                    }) as any),
                    ...toggleCSS,
                }}
            >
                {leftAddons && <span css={getCSS('toggleLeftAddons') as any}>{leftAddons}</span>}

                <span>{title}</span>

                {rightAddons && <span css={getCSS('toggleRightAddons') as any}>{rightAddons}</span>}
            </button>
        );
    }
);

Title.displayName = 'Title';
