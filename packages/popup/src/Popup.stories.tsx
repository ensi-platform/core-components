/* eslint-disable react-hooks/rules-of-hooks */
import type { Meta, StoryObj } from '@storybook/react';
import { ComponentProps, useMemo, useRef, useState } from 'react';

import { Button } from '@greensight/core-components-common';

import Popup from '.';
import PopupDesktop from './DesktopComponent';
import PopupMobile from './MobileComponent';
import { PopupSize } from './types';

export default {
    title: 'Components / Popup',
    component: Popup,
    parameters: {
        docs: {
            description: {
                // component: README,
            },
        },
        backgrounds: {
            default: 'grey100',
        },
    },
} as Meta<typeof Popup>;

type Args = Omit<ComponentProps<typeof Popup>, 'open'> & {
    component: 'PopupResponsive' | 'PopupDesktop' | 'PopupMobile';
    header: boolean;
    headerTitle: string;
    footer: boolean;
    flexContent: boolean;
    showMore: boolean;
};

export const Basic: StoryObj<Args> = {
    args: {
        component: 'PopupResponsive',
        size: 'md',
        header: true,
        headerTitle: 'Заголовок попапа может иметь любую длину',
        hasCloser: true,
        trim: true,
        align: 'left',
        stickyHeader: false,
        footer: true,
        stickyFooter: false,
        flexContent: true,
        keepMounted: false,
        fixedPosition: true,
        showMore: false,
        innerScroll: false,
    },
    argTypes: {
        component: {
            options: ['PopupResponsive', 'PopupDesktop', 'PopupMobile'],
            control: { type: 'radio' },
        },
        align: {
            options: ['left', 'right', 'center'],
            control: { type: 'radio' },
        },
        size: {
            options: Object.keys(PopupSize),
            control: { type: 'radio' },
        },
    },
    render: props => {
        const { header, footer, component, headerTitle, ...args } = props as never as Args;
        const [open, setOpen] = useState(false);
        const [isLoading, setLoading] = useState(false);
        const scrollHandler = useRef(null);
        const handleModalOpen = () => setOpen(!open);
        const [showMore, setShowMore] = useState(args.showMore);
        const Text = () => (
            <p style={{ margin: '0 0 16px' }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                deserunt mollit anim id est laborum.
            </p>
        );
        const Footer = () => (
            <>
                <Button theme="secondary" onClick={() => setOpen(false)}>
                    Отмена
                </Button>
                <Button
                    theme="primary"
                    onClick={() => {
                        setLoading(true);
                        setTimeout(() => {
                            setLoading(false);
                            setOpen(false);
                        }, 3000);
                    }}
                    disabled={!showMore || isLoading}
                >
                    {isLoading ? 'Принять...' : 'Принять'}
                </Button>
            </>
        );
        const Content = () => (
            <>
                <Text />
                {showMore && (
                    <>
                        <Text />
                        <Text />
                        <Text />
                        <Text />
                    </>
                )}
                <Button size="sm" type="button" onClick={() => setShowMore(!showMore)}>
                    {showMore ? 'Скрыть' : 'Показать еще'}
                </Button>
            </>
        );
        const PopupComponent = useMemo(
            () =>
                ({
                    PopupResponsive: Popup,
                    PopupDesktop,
                    PopupMobile,
                }[component]),
            [component]
        );
        return (
            <>
                <Button type="button" onClick={handleModalOpen}>
                    Открыть попап
                </Button>
                <PopupComponent
                    open={open}
                    onClose={handleModalOpen}
                    scrollHandler={args.innerScroll ? scrollHandler : undefined}
                    {...args}
                >
                    {header && <PopupComponent.Header title={headerTitle} />}
                    <PopupComponent.Content ref={scrollHandler}>
                        <Content />
                    </PopupComponent.Content>
                    {footer && (
                        <PopupComponent.Footer gap={8}>
                            <Footer />
                        </PopupComponent.Footer>
                    )}
                </PopupComponent>
            </>
        );
    },
};
