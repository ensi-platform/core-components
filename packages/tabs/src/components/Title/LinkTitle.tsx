import { type HTMLProps, forwardRef } from 'react';

import { useTabsTheme } from '../../context';
import type { TabListTitleType } from '../../types';

type Props = TabListTitleType & HTMLProps<HTMLAnchorElement>;

/**
 * Component for making tab heading a link. Looks like default tab heading, but behaves as link
 * @param id tab unique id
 * @param toggleCSS additional tab heading css
 * @param title string title of tab
 * @param rightAddons right addon on heading
 * @param leftAddons left addon on heading
 * @param hidden hide tab and heading visually
 * @param selected is this tab selected
 * @param disabled is this tab disabled
 * @param collapsed is this tab collapsed
 * @param focused is it shown visually that tab is selected
 * @param isOption is it in collapsed list
 * @param href URL link
 */
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
