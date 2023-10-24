import { useMemo } from 'react';

import Popup, { PopupProps, Content } from '@greensight/core-components-popup';

import { Button, scale, defaultTheme } from '@greensight/core-components-common';

import { ActionEnum } from './enums';

export * from './enums';
export * from './types';

const { typography } = defaultTheme;

export interface ActionPopupProps extends Omit<PopupProps, 'title'> {
    action?: ActionEnum;
    title?: string;
    onAction?: () => void;
}

const ActionPopup = ({ action, title, children, onClose, onAction, ...props }: ActionPopupProps) => {
    const btnParams = useMemo(() => {
        switch (action) {
            case ActionEnum.DELETE: {
                return {
                    theme: 'dangerous',
                    actionButtonText: 'Удалить',
                    closeButtonText: 'Не удалять',
                };
            }
            case ActionEnum.COPY: {
                return {
                    theme: 'primary',
                    actionButtonText: 'Дублировать',
                    closeButtonText: 'Не дублировать',
                };
            }
            case ActionEnum.UNTIE: {
                return {
                    theme: 'primary',
                    actionButtonText: 'Отвязать',
                    closeButtonText: 'Не отвязывать',
                };
            }
            default: {
                return {
                    theme: 'primary',
                    actionButtonText: 'Сохранить',
                    closeButtonText: 'Отмена',
                };
            }
        }
    }, [action]);

    return (
        <Popup hasCloser={false} onClose={onClose} {...props}>
            <Popup.Header>
                <p css={{ marginBottom: scale(1, true), ...typography('h3') }}>{title}</p>
            </Popup.Header>
            {children}
            <Popup.Footer css={{ display: 'flex', justifyContent: 'flex-end' }}>
                {onAction && (
                    <Button theme={btnParams.theme} onClick={() => onAction()}>
                        {btnParams.actionButtonText}
                    </Button>
                )}
                <Button onClick={onClose} theme="secondary">
                    {btnParams.closeButtonText}
                </Button>
            </Popup.Footer>
        </Popup>
    );
};

ActionPopup.Content = Content;

export default ActionPopup;
