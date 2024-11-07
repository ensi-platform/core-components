import { type Action, ActionType, usePopupState } from '@ensi-platform/core-components-common';

import { type Dispatch } from 'react';

import { ActionEnum, ActionPopup } from '../../index';
import { type ActionState } from '../../types';

const ActionPopupComponent = ({
    popupState,
    popupDispatch,
}: {
    popupState: Partial<ActionState>;
    popupDispatch: Dispatch<Action<Partial<ActionState>>>;
}) => (
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
    >
        {popupState.children && <ActionPopup.Content>{popupState.children}</ActionPopup.Content>}
    </ActionPopup>
);

export const useActionPopup = () => {
    const [popupState, popupDispatch] = usePopupState<Partial<ActionState>>({ open: false });

    return { popupState, popupDispatch, ActionPopup: ActionPopupComponent, ActionEnum, ActionType };
};
