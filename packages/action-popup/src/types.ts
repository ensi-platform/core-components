import { ReactNode } from 'react';

import { ActionEnum } from './scripts/enums';

export type ActionState = {
    onAction: () => Promise<any> | void;
    title: string;
    popupAction: ActionEnum;
    open: boolean;
    children: ReactNode | ReactNode[];
};
