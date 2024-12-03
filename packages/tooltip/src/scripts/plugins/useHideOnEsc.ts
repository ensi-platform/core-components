import { useEffect } from 'react';

import type { IUseHideOnEsc } from '../../types';

export const useHideOnEsc = ({ open, enableHideOnEsc, handleClose }: IUseHideOnEsc) => {
    useEffect(() => {
        if (!open || !enableHideOnEsc) return;

        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                handleClose();
            }
        };

        document.addEventListener('keydown', onKeyDown);

        return () => {
            document.removeEventListener('keydown', onKeyDown);
        };
    }, [open, enableHideOnEsc, handleClose]);
};
