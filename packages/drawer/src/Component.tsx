import { BaseModal } from '@ensi-platform/core-components-base-modal';
import { emptyCSS, useMergeCSS, useThemeCSSPart } from '@ensi-platform/core-components-common';

import { forwardRef, useMemo } from 'react';

import Content from './components/compound/Content';
import Footer from './components/compound/Footer';
import Header from './components/compound/Header';
import { DrawerThemeProvider } from './context';
import { useTransitionStyles } from './scripts';
import { DRAWER_THEMES } from './themes';
import type { DrawerStateFullType, IDrawerProps } from './types';

const DrawerComponent = forwardRef<HTMLDivElement, IDrawerProps>(
    (
        {
            open,
            className,
            children,
            contentCSS = emptyCSS,
            placement = 'right',
            timeout = 200,
            theme = DRAWER_THEMES.basic,
            backdropProps,
            ...props
        },
        ref
    ) => {
        const transitionStyles = useTransitionStyles({ timeout, placement });

        const themeState = useMemo<DrawerStateFullType>(
            () => ({
                placement,
                size: 'md',
                variant: 'primary',
            }),
            [placement]
        );

        const getCSS = useThemeCSSPart(theme, themeState);
        const styles = useMergeCSS(getCSS('component'), contentCSS);

        return (
            <BaseModal
                scrollHandler="content"
                ref={ref}
                open={open}
                transitionStyles={transitionStyles}
                className={className}
                backdropProps={backdropProps}
                {...props}
            >
                <DrawerThemeProvider size="md" variant="primary" state={themeState} theme={theme}>
                    <div css={styles}>{children}</div>
                </DrawerThemeProvider>
            </BaseModal>
        );
    }
);

const Drawer = Object.assign(DrawerComponent, {
    Header,
    Content,
    Footer,
});

export default Drawer;
