import {
    Button,
    Icon20CheckCircle,
    Icon20ClosedCircle,
    Icon20Delete,
    Icon20Info,
    Icon20Warning,
    defaultTheme,
    scale,
} from '@ensi-platform/core-components-common';
import { Popup, PopupContent, PopupFooter, PopupHeader } from '@ensi-platform/core-components-popup';

import { type ReactNode, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { ActionEnum, ThemesEnum } from './scripts/enums';
import type { IActionPopupProps } from './types';

const { colors, typography, theme } = defaultTheme;

export * from './scripts/enums';
export * from './scripts/hooks/useActionPopup';
export * from './types';

export const ActionPopup = ({
    action,
    title,
    leftAddonIconTheme,
    children,
    onClose,
    onAction,
    onBackdropClick,
    disableAction,
    disableClose,
    blockButtons = true,
    disableFooter,
    ...props
}: IActionPopupProps) => {
    const { t } = useTranslation('common');

    const btnParams = useMemo(() => {
        switch (action) {
            case ActionEnum.DELETE: {
                return {
                    // TODO Разобраться почему в REP не работает тема button-a из core-components-common
                    theme: 'dangerous',
                    actionButtonText: t('common:components.delete'),
                    closeButtonText: t('common:components.notDelete'),
                };
            }
            case ActionEnum.COPY: {
                return {
                    theme: 'primary',
                    actionButtonText: t('common:components.duplicate'),
                    closeButtonText: t('common:components.notDuplicate'),
                };
            }
            case ActionEnum.CONFIRM: {
                return {
                    theme: 'primary',
                    actionButtonText: t('common:components.confirm'),
                    closeButtonText: t('common:components.cancel'),
                };
            }
            case ActionEnum.UNTIE: {
                return {
                    theme: 'primary',
                    actionButtonText: t('common:components.untie'),
                    closeButtonText: t('common:components.notUntie'),
                };
            }
            default: {
                return {
                    theme: 'primary',
                    actionButtonText: t('common:components.save'),
                    closeButtonText: t('common:components.notSave'),
                };
            }
        }
    }, [action, t]);

    const leftAddonIcon = (): ReactNode => {
        switch (leftAddonIconTheme) {
            case ThemesEnum.WARNING: {
                return <Icon20Warning css={{ fill: colors?.warning }} />;
            }
            case ThemesEnum.ERROR: {
                return <Icon20ClosedCircle css={{ fill: colors?.danger }} />;
            }
            case ThemesEnum.SUCCESS: {
                return <Icon20CheckCircle css={{ fill: colors?.success }} />;
            }
            case ThemesEnum.DELETE: {
                return <Icon20Delete css={{ fill: colors?.danger }} />;
            }
            case ThemesEnum.INFO: {
                return <Icon20Info css={{ fill: colors?.primary }} />;
            }
            default: {
                return null;
            }
        }
    };

    return (
        <Popup hasCloser={false} onClose={onBackdropClick ?? onClose} {...props}>
            <PopupHeader
                leftAddons={leftAddonIcon()}
                addonCSS={{
                    paddingRight: scale(2),
                    height: 'auto',
                    minHeight: 'auto',
                }}
            >
                <p css={typography('h3')}>{title}</p>
            </PopupHeader>
            {children}
            {!disableFooter && (
                <PopupFooter css={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button
                        onClick={onClose}
                        theme="secondary"
                        disabled={disableClose}
                        __theme={theme.components.Button}
                        block={blockButtons}
                        css={{
                            height: scale(4),
                            padding: scale(1),
                            ...typography('buttonBold'),
                        }}
                    >
                        {btnParams.closeButtonText}
                    </Button>
                    {onAction && (
                        <Button
                            onClick={() => onAction()}
                            theme={btnParams.theme}
                            disabled={disableAction}
                            // FIXME при сборке тема не подтягивается из core-components-common а берется из @greensight/gds, поэтому пока пробрасываем тему компоненту напрямую
                            __theme={theme.components.Button}
                            block={blockButtons}
                            css={{
                                height: scale(4),
                                padding: scale(1),
                                ...typography('buttonBold'),
                            }}
                        >
                            {btnParams.actionButtonText}
                        </Button>
                    )}
                </PopupFooter>
            )}
        </Popup>
    );
};

export const ActionPopupContent = PopupContent;
