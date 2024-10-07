import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';
import type { ComponentProps } from 'react';

import { usePopupState, ActionType, Button } from '@greensight/core-components-common';

import README from '../README.md';
import { ActionPopup, ActionEnum, ActionState } from './index';
import { useActionPopup } from './scripts/useActionPopup';

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
        popupAction: ActionEnum.COPY,
        title: 'ActionPopup Title',
        onAction: action('onAction'),
    },
    argTypes: {
        popupAction: {
            control: {
                type: 'radio',
                options: ActionEnum,
            },
        },
    },
} as Meta<typeof ActionPopup>;

const Popup = (args: Record<string, any>) => {
    const [popupState, popupDispatch] = usePopupState<Partial<ActionState>>({ open: false });

    return (
        <>
            <Button
                onClick={() => {
                    popupDispatch({
                        payload: args,
                        type: ActionType.Edit,
                    });
                }}
            >
                Открыть
            </Button>
            <ActionPopup
                open={!!popupState.open}
                onClose={() => {
                    popupDispatch({ type: ActionType.PreClose });
                }}
                onUnmount={() => {
                    popupDispatch({ type: ActionType.Close });
                }}
                onAction={async () => {
                    try {
                        popupDispatch({ type: ActionType.PreClose });
                        if (popupState.onAction) await popupState.onAction();
                    } catch (err) {
                        console.error(err);
                    }
                }}
                action={popupState.popupAction}
                title={popupState.title}
            />
        </>
    );
};

export const Basic: StoryObj<ComponentProps<typeof ActionPopup>> = {
    args: {},
    render: Popup,
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
