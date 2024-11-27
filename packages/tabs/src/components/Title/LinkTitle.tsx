import { type HTMLProps, forwardRef } from 'react';

import { useTabsTheme } from '../../context';
import type { TabListTitleType } from '../../types';

type Props = TabListTitleType & HTMLProps<HTMLAnchorElement>;

export const TabLinkTitle = forwardRef<HTMLAnchorElement, Props>(
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
            href,
            ...restProps
        },
        ref
    ) => {
        delete restProps.renderTitle;
        delete restProps.unfocusable;
        const { getCSS } = useTabsTheme();

        if (hidden) return null;

        return (
            <a
                ref={ref}
                id={`${id}`}
                href={href}
                css={{
                    ...getCSS('toggle', {
                        disabled,
                        isSelected: selected,
                        focused,
                        isOption,
                        isCollapsed: collapsed && !isOption,
                    }),
                    ...toggleCSS,
                }}
                {...restProps}
            >
                {leftAddons && <span css={getCSS('toggleLeftAddons')}>{leftAddons}</span>}
                <span>{title}</span>
                {rightAddons && <span css={getCSS('toggleRightAddons')}>{rightAddons}</span>}
            </a>
        );
    }
);

TabLinkTitle.displayName = 'TabLinkTitle';
