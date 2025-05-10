/* eslint-disable react-hooks/rules-of-hooks */
import { Button } from '@ensi-platform/core-components-common';

import type { Meta, StoryObj } from '@storybook/react';

import { type ComponentProps, useRef, useState } from 'react';

import { POPUP_THEMES, Popup, PopupContent, PopupFooter, PopupHeader } from '.';
import README from '../README.md';
import { PopupSizesEnum, PopupVariantsEnum } from './scripts';

export default {
    title: 'Components / Popup',
    component: Popup,
    parameters: {
        docs: {
            description: {
                component: README,
            },
        },
    },
    argTypes: {
        open: {
            table: { summary: 'boolean' },
            description: 'Is popup open',
            required: true,
        },
        flex: {
            table: { summary: 'boolean' },
            description: 'Stretches the content to its full height.',
            defaultValue: { summary: false },
        },
        children: {
            table: {
                type: { summary: 'ReactNode' },
            },
            required: true,
            description: 'Popup content.',
        },
        innerScroll: {
            table: {
                type: { summary: 'boolean' },
            },
            description: 'Has inner scroll.',
            defaultValue: { summary: false },
        },
        stickyFooter: {
            table: {
                type: { summary: 'boolean' },
            },
            defaultValue: {
                summary: false,
            },
            description: 'Sticky footer',
        },
        stickyHeader: {
            table: {
                type: { summary: 'boolean' },
            },
            description: 'Sticky header.',
            defaultValue: { summary: false },
        },
        align: {
            table: {
                type: { summary: 'left | right | center' },
            },
            options: ['left', 'right', 'center'],
            control: { type: 'radio' },
            description: 'Title alignment.',
            defaultValue: { summary: 'left' },
        },
        hasCloser: {
            table: {
                type: { summary: 'boolean' },
            },
            description: 'The presence of the closure component (cross).',
            defaultValue: { summary: true },
        },
        trim: {
            table: {
                type: { summary: 'boolean' },
            },
            description: 'Trim the title.',
            defaultValue: { summary: false },
        },
        view: {
            table: {
                type: { summary: 'mobile | desktop' },
            },
            description: 'Mobile or desktop view.',
            options: ['mobile', 'desktop'],
            control: { type: 'radio' },
        },
        fixedPosition: {
            table: {
                type: { summary: 'boolean' },
            },
            description:
                'Fixes the position of the modal window after opening, preventing jumps if the content inside changes.',
            defaultValue: { summary: false },
        },
        hasContent: {
            table: {
                type: { summary: 'boolean' },
            },
            description: 'Enable header content.',
            defaultValue: { sumamry: false },
        },
        highlighted: {
            table: {
                type: { summary: 'boolean' },
            },
            description: ' Highlight BaseModal header / footer.',
            defaultValue: { summary: false },
        },
        isFullscreen: {
            table: {
                type: { summary: 'boolean' },
            },
            description: 'Full-screen display of content.',
            defaultValue: { summary: false },
        },
        className: {
            table: {
                type: { summary: 'string' },
            },
            description: 'Additional styles.',
        },
        variant: {
            table: {
                type: { summary: 'string' },
            },
            options: Object.values(PopupVariantsEnum),
            control: { type: 'select' },
            defaultValue: {
                summary: PopupVariantsEnum.primary,
            },
            summary: 'string',
        },
        theme: {
            table: {
                type: { summary: 'string' },
            },
            options: Object.keys(POPUP_THEMES),
            control: { type: 'select' },
            defaultValue: {
                summary: 'basic',
            },
            summary: 'string',
        },
        breakpoint: {
            table: {
                type: { summary: 'number' },
            },
            description: 'The breakpoint, the desktop version starts from it.',
            defaultValue: { summary: 1024 },
        },
        size: {
            table: {
                type: { summary: 'Element' },
            },
            options: Object.keys(PopupSizesEnum),
            control: { type: 'select' },
            defaultValue: { summary: PopupSizesEnum.md },
        },
    },
} as Meta<typeof Popup>;

const defaultProps: ComponentProps<typeof Popup> = {
    open: false,
    flex: false,
    innerScroll: false,
    stickyFooter: false,
    stickyHeader: false,
    align: 'left',
    hasCloser: true,
    trim: false,
    view: undefined,
    fixedPosition: false,
    hasContent: false,
    highlighted: false,
    isFullscreen: false,
    children: undefined,
    className: undefined,
    size: PopupSizesEnum.md,
    breakpoint: 1024,
};

export const Basic: StoryObj<ComponentProps<typeof Popup>> = {
    args: {
        ...defaultProps,
        size: 'md',
        hasCloser: true,
        trim: true,
        align: 'left',
        flex: true,
        fixedPosition: true,
    },
    render: ({ open, ...args }) => {
        const [isOpen, setIsOpen] = useState(open);
        const [isLoading, setLoading] = useState(false);
        const scrollHandler = useRef(null);
        const handleModalOpen = () => setIsOpen(!isOpen);
        const [showMore, setShowMore] = useState(false);
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
                <Button theme="secondary" onClick={() => setIsOpen(false)}>
                    Отмена
                </Button>
                <Button
                    theme="primary"
                    onClick={() => {
                        setLoading(true);
                        setTimeout(() => {
                            setLoading(false);
                            setIsOpen(false);
                        }, 3000);
                    }}
                    disabled={!showMore || isLoading}
                >
                    {isLoading ? 'Accept...' : 'Accept'}
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
                    {showMore ? 'Hide' : 'Show more'}
                </Button>
            </>
        );
        return (
            <>
                <Button type="button" onClick={handleModalOpen}>
                    Open popup
                </Button>
                <Popup
                    open={isOpen}
                    onClose={handleModalOpen}
                    scrollHandler={args.innerScroll ? scrollHandler : undefined}
                    highlighted={false}
                    {...args}
                >
                    <PopupHeader title="The header of the popup can have any length" />
                    <PopupContent ref={scrollHandler}>
                        <Content />
                    </PopupContent>
                    <PopupFooter gap={8}>
                        <Footer />
                    </PopupFooter>
                </Popup>
            </>
        );
    },
};
