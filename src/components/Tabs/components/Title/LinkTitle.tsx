import Link, { LinkProps } from 'next/link';
import { HTMLProps, ReactNode, forwardRef } from 'react';

import { useTabsTheme } from '../../context';
import { SelectedId, TabListTitle } from '../../types';

type Props = Omit<TabListTitle & Omit<LinkProps, 'passHref'> & HTMLProps<HTMLAnchorElement>, 'id' | 'title'> & {
    id?: SelectedId;
    title: ReactNode;
};

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

        if (hidden) return <></>;

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
                        ...(getCSS('toggle', {
                            disabled,
                            isSelected: selected,
                            focused,
                            isOption,
                            isCollapsed: collapsed && !isOption,
                        }) as any),
                        ...toggleCSS,
                    }}
                    {...restProps}
                >
                    {leftAddons && <span css={getCSS('toggleLeftAddons') as any}>{leftAddons}</span>}
                    <span>{title}</span>
                    {rightAddons && <span css={getCSS('toggleRightAddons') as any}>{rightAddons}</span>}
                </a>
            </Link>
        );
    }
);

LinkTitle.displayName = 'LinkTitle';
