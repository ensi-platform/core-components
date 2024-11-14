import { BaseModal } from '@ensi-platform/core-components-base-modal';
import { useThemeCSSPart } from '@ensi-platform/core-components-common';

import deepmerge from 'deepmerge';
import { forwardRef, useMemo } from 'react';

import { Content } from './components/Content';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { DrawerThemeProvider } from './context';
import { drawerThemes } from './themes/defaultTheme';
import type { DrawerProps, DrawerThemeState } from './types';

const DrawerComponent = forwardRef<HTMLDivElement, DrawerProps>(
    (
        {
            open,
            className,
            children,
            contentCss = {},
            placement = 'right',
            timeout = 300,
            theme = drawerThemes.basic,
            ...restProps
        },
        ref
    ) => {
        const isLeftPlacement = placement === 'left';

        const themeState = useMemo<DrawerThemeState>(
            () => ({
                placement,
                size: 'md',
                variant: 'primary',
            }),
            [placement]
        );

        const getCSS = useThemeCSSPart(theme, themeState);

        const styles = useMemo(() => deepmerge.all<any>([getCSS('component'), contentCss]), [contentCss, getCSS]);

        return (
            <BaseModal
                {...restProps}
                scrollHandler="content"
                ref={ref}
                open={open}
                styles={{
                    preEnter: {
                        transform: `translateX(${isLeftPlacement ? '-100%' : '100%'})`,
                    },
                    entering: {
                        transform: 'translateX(0)',
                        transition: `transform ${timeout}ms ease-out`,
                    },
                    entered: {
                        transform: 'translateX(0)',
                        transition: `transform ${timeout}ms ease-out`,
                    },
                    exiting: {
                        transform: `translateX(${isLeftPlacement ? '-100%' : '100%'})`,
                        transition: `transform ${timeout * 2}ms ease-out`,
                    },
                    exited: {
                        transform: `translateX(${isLeftPlacement ? '-100%' : '100%'})`,
                    },
                }}
                className={className}
                backdropProps={{ ...restProps.backdropProps }}
            >
                <DrawerThemeProvider size="md" variant="primary" state={themeState} theme={theme}>
                    <div css={styles}>{children}</div>
                </DrawerThemeProvider>
            </BaseModal>
        );
    }
);

export const Drawer = Object.assign(DrawerComponent, {
    Header,
    Content,
    Footer,
});
