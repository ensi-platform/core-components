import { ActionType, Button, typography, usePopupState } from '@ensi-platform/core-components-common';

import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';

import type { ComponentProps } from 'react';

import README from '../README.md';
import { ActionEnum, ActionPopup, ThemesEnum } from './index';
import { useActionPopup } from './scripts/hooks/useActionPopup';
import { ActionState } from './types';

export default {
    title: 'Components / ActionPopup',
    component: ActionPopup,
    parameters: {
        docs: {
            description: {
                component: README,
            },
        },
    },
    args: {
        title: 'ActionPopup Title',
        onAction: action('onAction'),
        disableAction: false,
        disableClose: false,
        disableFooter: false,
        blockButtons: true,
    },
    argTypes: {
        action: {
            control: { type: 'radio' },
            options: [...Object.values(ActionEnum), undefined],
        },
        disableAction: {
            control: 'boolean',
        },
        disableClose: {
            control: 'boolean',
        },
        disableFooter: {
            control: 'boolean',
        },
        blockButtons: {
            control: 'boolean',
        },
        leftAddonIconTheme: {
            control: { type: 'radio' },
            options: [...Object.values(ThemesEnum), undefined],
        },
    },
} as Meta<typeof ActionPopup>;

type Story = StoryObj<typeof ActionPopup>;

const Template: Story = {
    render: args => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [popupState, popupDispatch] = usePopupState<Partial<ActionState>>({ open: args.open });

        return (
            <>
                <Button
                    onClick={() => {
                        popupDispatch({ type: ActionType.Add });
                    }}
                >
                    Открыть
                </Button>
                <ActionPopup
                    {...popupState}
                    {...args}
                    onClose={() => {
                        popupDispatch({ type: ActionType.PreClose });
                    }}
                    onUnmount={() => {
                        popupDispatch({ type: ActionType.Close });
                    }}
                    onAction={async () => {
                        popupDispatch({ type: ActionType.PreClose });
                        if (popupState.onAction) await popupState.onAction();
                    }}
                >
                    {args.children && <ActionPopup.Content>{args.children}</ActionPopup.Content>}
                </ActionPopup>
            </>
        );
    },
};

export const WithChildren: Story = {
    render: Template.render,
    name: 'With children',
    args: {
        children: <p css={{ ...typography('bodySmBold') }}>This is ActionPopup Content Section</p>,
    },
};

export const WithoutChildren: Story = {
    render: Template.render,
    name: 'Without children',
    args: {
        children: null,
    },
};

const useActionHook = () => {
    const { popupState, popupDispatch, ActionPopup, ActionEnum, ActionType } = useActionPopup();

    return (
        <>
            <Button
                onClick={() => {
                    popupDispatch({
                        type: ActionType.Delete,
                        payload: {
                            title: 'Вы уверены, что хотите удалить атрибут?',
                            popupAction: ActionEnum.DELETE,
                            onAction: async () => {
                                alert('onAction');
                            },
                        },
                    });
                }}
            >
                Открыть
            </Button>
            <ActionPopup popupState={popupState} popupDispatch={popupDispatch} />
        </>
    );
};

export const WithUseActionPopup: StoryObj<ComponentProps<typeof ActionPopup>> = {
    args: {},
    render: useActionHook,
};
