import { type ButtonHTMLAttributes, forwardRef } from 'react';

import { useTabsTheme } from '../../context';
import type { TabListTitleType } from '../../types';

type Props = TabListTitleType & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'id'>;

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
            countErrors,

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
                    ...getCSS('toggle', {
                        disabled,
                        isSelected: selected,
                        focused,
                        isOption,
                        isCollapsed: collapsed && !isOption,
                        hasErrors: countErrors > 0,
                    }),
                    ...toggleCSS,
                }}
            >
                {leftAddons && <span css={getCSS('toggleLeftAddons')}>{leftAddons}</span>}

                <span className="toggle-title">{title}</span>

                {rightAddons && <span css={getCSS('toggleRightAddons')}>{rightAddons}</span>}

                {countErrors > 0 && <span css={getCSS('errorAddon')}>{countErrors}</span>}
            </button>
        );
    }
);

Title.displayName = 'Title';
