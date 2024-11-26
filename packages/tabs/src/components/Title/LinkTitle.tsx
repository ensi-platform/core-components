import Link, { type LinkProps } from 'next/link';
import { type HTMLProps, forwardRef } from 'react';

import { useTabsTheme } from '../../context';
import type { TabListTitleType } from '../../types/component';

type Props = TabListTitleType & Omit<LinkProps, 'passHref'> & HTMLProps<HTMLAnchorElement>;

export const LinkTitle = forwardRef<HTMLAnchorElement, Props>(
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
            as,
            replace,
            scroll,
            shallow,
            locale,
            ...restProps
        },
        ref
    ) => {
        delete restProps.renderTitle;
        delete restProps.unfocusable;
        const { getCSS } = useTabsTheme();

        if (hidden) return null;

        return (
            <Link
                {...(!disabled
                    ? {
                          href,
                          as,
                      }
                    : {
                          href: undefined as never as string,
                      })}
                replace={replace}
                scroll={scroll}
                shallow={shallow}
                locale={locale}
                passHref
            >
                <a
                    ref={ref}
                    id={`${id}`}
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
            </Link>
        );
    }
);

LinkTitle.displayName = 'LinkTitle';
