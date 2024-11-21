import type { ReactNode } from 'react';

import type { ActionEnum, ThemesEnum } from '../scripts/enums';

export type ActionState = {
    onAction: () => Promise<any> | void;
    title: string;
    popupAction: ActionEnum;
    popupTheme: ThemesEnum;
    open: boolean;
    children: ReactNode | ReactNode[];
};
