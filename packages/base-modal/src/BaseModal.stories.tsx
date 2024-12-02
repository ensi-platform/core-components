import { Button, defaultTheme, emptyCSS, scale } from '@ensi-platform/core-components-common';
import { StackingOrderEnum } from '@ensi-platform/core-components-stack';

import type { Meta, StoryObj } from '@storybook/react';

import { type ComponentProps, useState } from 'react';

import README from '../README.md';
import { BaseModal } from './index';

const { colors } = defaultTheme;

export default {
    title: 'Components / BaseModal',
    component: BaseModal,
    parameters: {
        docs: {
            description: {
                component: README,
            },
        },
    },
    argTypes: {
        children: {
            table: {
                type: { summary: 'ReactNode' },
            },
            description: 'BaseModal content.',
        },
        Backdrop: {
            table: {
                type: { summary: 'FC<IBackdropProps>' },
            },
            description: 'BaseModal Backdrop.',
        },
        backdropProps: {
            table: {
                type: { summary: 'IBackdropProps' },
            },
            description: 'Props for BaseModal Backdrop.',
        },
        container: {
            table: {
                type: { summary: '() => Element | undefined' },
            },
            description: 'Function that returns the container to which the portals will be added',
        },
        disableAutoFocus: {
            table: {
                type: { summary: 'boolean' },
            },
            description: 'Disable automatic focus transfer to the modal when opening.',
            summary: 'boolean',
            defaultValue: {
                summary: false,
            },
        },
        disableFocusLock: {
            table: {
                type: { summary: 'boolean' },
            },
            description: 'Disable focus lock.',
            summary: 'boolean',
            defaultValue: {
                summary: false,
            },
        },
        disableRestoreFocus: {
            table: {
                type: { summary: 'boolean' },
            },
            description: 'Disable focus restoration.',
            summary: 'boolean',
            defaultValue: {
                summary: false,
            },
        },
        disableEscapeKeyDown: {
            table: {
                type: { summary: 'boolean' },
            },
            description: 'Disable the `callback` call when pressing Escape.',
            summary: 'boolean',
            defaultValue: {
                summary: false,
            },
        },
        disableBackdropClick: {
            table: {
                type: { summary: 'boolean' },
            },
            description: 'Disable the `callback` call when clicking on the backdrop.',
            summary: 'boolean',
            defaultValue: {
                summary: false,
            },
        },
        disableBlockingScroll: {
            table: {
                type: { summary: 'false' },
            },
            description: 'Disable scroll lock when opening a modal window.',
            summary: 'boolean',
            defaultValue: {
                summary: false,
            },
        },
        keepMounted: {
            table: {
                type: { summary: 'boolean' },
            },
            description: 'Content of the modal are always in the DOM.',
            summary: 'boolean',
            defaultValue: {
                summary: false,
            },
        },
        open: {
            table: {
                type: { summary: 'boolean' },
            },
            description: 'Is modal open.',
            summary: 'boolean',
            required: true,
            defaultValue: {
                summary: false,
            },
        },
        className: {
            table: {
                type: { summary: 'string' },
            },
            description: 'Additional styles.',
            summary: 'string',
        },
        contentCSS: {
            table: {
                type: { summary: 'CSSObject' },
            },
            description: 'Additional content styles.',
            summary: 'object',
        },
        wrapperCSS: {
            table: {
                type: { summary: 'CSSObject' },
            },
            description: 'Additional wrapper styles.',
            summary: 'object',
        },
        scrollHandler: {
            table: {
                type: { summary: '"wrapper" | "content" | MutableRefObject<HTMLDivElement | null>' },
            },
            description: 'Scroll handler.',
            summary: 'function',
        },
        onBackdropClick: {
            table: {
                type: { summary: '(event: MouseEvent) => void' },
            },
            description: 'Backdrop click handler.',
            summary: 'function',
        },
        onEscapeKeyDown: {
            table: {
                type: { summary: '(event: KeyboardEvent) => void' },
            },
            description:
                'Escape click handler<br />Called if `disableEscapeKeyDown` is false and the modal window is in focus.',
            summary: 'function',
        },
        onClose: {
            table: {
                type: {
                    summary:
                        '(event: MouseEvent<HTMLElement> | KeyboardEvent<HTMLElement>, reason?: ClosureReasonsType) => void',
                },
            },
            description: 'Close handler.',
            summary: 'function',
        },
        onMount: {
            table: {
                type: { summary: '() => void' },
            },
            description: 'Function that will be called after component mount.',
            summary: 'function',
        },
        onUnmount: {
            table: {
                type: { summary: '() => void' },
            },
            description: 'Function that will be called after component unmount.',
            summary: 'function',
        },
        dataTestId: {
            table: {
                type: { summary: 'string' },
            },
            description: 'Identifier for automated testing systems.',
            summary: 'string',
        },
        zIndex: {
            table: {
                type: { summary: 'number' },
            },
            description: 'Modal z-index.',
            summary: 'number',
            defaultValue: {
                summary: StackingOrderEnum.MODAL,
            },
        },
        componentRef: {
            table: {
                type: { summary: 'MutableRefObject<HTMLDivElement | null>' },
            },
            description: 'Ref that can be set to a component area.',
            summary: 'object',
        },
        timeout: {
            table: {
                type: { summary: 'number' },
            },
            description: 'Animation time.',
            summary: 'number',
            defaultValue: {
                summary: 200,
            },
        },
        transitionStyles: {
            table: {
                type: { summary: 'Partial<Record<TransitionStatus, CSSObject>>' },
            },
            description: 'Styles for react-transition-state.',
            summary: 'object',
        },
        id: {
            table: {
                type: { summary: 'string' },
            },
            description: 'Modal id.',
            summary: 'string',
        },
    },
} as Meta<typeof BaseModal>;

const defaultProps: ComponentProps<typeof BaseModal> = {
    timeout: 200,
    zIndex: StackingOrderEnum.MODAL,
    open: false,
    disableBlockingScroll: false,
    disableBackdropClick: false,
    disableEscapeKeyDown: false,
    disableRestoreFocus: false,
    disableFocusLock: false,
    disableAutoFocus: false,
    keepMounted: false,
    scrollHandler: 'wrapper',
    container: undefined,
    children: undefined,
    Backdrop: undefined,
    backdropProps: undefined,
    className: undefined,
    contentCSS: emptyCSS,
    wrapperCSS: emptyCSS,
    dataTestId: undefined,
    componentRef: undefined,
    transitionStyles: undefined,
    id: undefined,
    onBackdropClick: undefined,
    onEscapeKeyDown: undefined,
    onUnmount: undefined,
    onMount: undefined,
    onClose: undefined,
};

export const Basic: StoryObj<ComponentProps<typeof BaseModal>> = {
    args: {
        ...defaultProps,
        backdropProps: {
            invisible: false,
        },
    },
    render: args => {
        const [isOpen, setOpen] = useState(false);
        const handleModalOpen = () => setOpen(!isOpen);
        return (
            <div>
                <Button onClick={handleModalOpen}>{isOpen ? 'Close' : 'Open'} me</Button>
                <BaseModal {...args} open={isOpen} onClose={() => setOpen(false)}>
                    <div style={{ padding: scale(10), background: colors.white }}>
                        <span css={{ display: 'block' }}>BaseModal content!</span>
                    </div>
                </BaseModal>
            </div>
        );
    },
};
