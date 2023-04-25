import { forwardRef } from 'react';

import BaseModal from '@components/BaseModal';

import { useTheme } from '@scripts/gds';

import { Content } from './components/Content';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { DrawerProps } from './types';

const DrawerComponent = forwardRef<HTMLDivElement, DrawerProps>(
    ({ open, className, children, contentCss = {}, placement = 'right', timeout = 300, ...restProps }, ref) => {
        const { colors } = useTheme();

        const isRightPlacement = placement === 'right';
        const isLeftPlacement = placement === 'left';

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
                <div
                    css={{
                        display: 'flex',
                        flexDirection: 'column',
                        position: 'fixed',
                        top: 0,
                        height: '100%',
                        width: 336,
                        flex: 1,
                        overflow: 'auto',
                        willChange: 'transform',
                        backgroundColor: colors?.white,
                        ...(isLeftPlacement && { left: 0, right: 'auto', alignSelf: 'flex-start' }),
                        ...(isRightPlacement && { right: 0, left: 'auto', alignSelf: 'flex-end' }),
                        ...contentCss,
                    }}
                >
                    {children}
                </div>
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
