import { useCallback, useEffect, useRef, useState } from 'react';

import type { IUseTooltipProps } from '../../types';

export const useTooltip = ({ onOpenDelay, onCloseDelay, trigger, forcedOpen, onOpen, onClose }: IUseTooltipProps) => {
    const [visible, setVisible] = useState(!!forcedOpen);
    const [target, setTarget] = useState<HTMLElement | null>(null);
    const contentRef = useRef<HTMLDivElement | null>(null);
    const timer = useRef<number | undefined>(undefined);

    const open = useCallback(() => {
        if (!visible) {
            setVisible(true);
            onOpen?.();
        }
    }, [onOpen, visible]);

    const close = useCallback(() => {
        if (visible) {
            setVisible(false);
            onClose?.();
        }
    }, [onClose, visible]);

    const handleOpen = useCallback(() => {
        if (trigger === 'hover') {
            if (timer.current !== undefined) clearTimeout(timer.current);
            timer.current = window.setTimeout(open, onOpenDelay);
            return;
        }

        open();
    }, [onOpenDelay, open, trigger]);

    const handleClose = useCallback(() => {
        if (trigger === 'hover') {
            if (timer.current !== undefined) clearTimeout(timer.current);
            timer.current = window.setTimeout(close, onCloseDelay);
            return;
        }

        close();
    }, [trigger, close, onCloseDelay]);

    const clickedOutside = useCallback(
        (node: Element): boolean => {
            if (!node) return true;
            if (target && target.contains(node)) {
                return false;
            }

            if (contentRef.current && contentRef.current.contains(node)) {
                return false;
            }

            return true;
        },
        [target]
    );

    useEffect(() => {
        if (forcedOpen !== undefined) {
            setVisible(forcedOpen);
        }
    }, [forcedOpen]);

    useEffect(() => {
        const handleBodyClick = (event: MouseEvent | TouchEvent) => {
            if (clickedOutside(event.target as Element)) handleClose();
        };

        document.body.addEventListener('mousedown', handleBodyClick);
        document.body.addEventListener('touchstart', handleBodyClick);

        return () => {
            document.body.removeEventListener('mousedown', handleBodyClick);
            document.body.removeEventListener('touchstart', handleBodyClick);

            if (timer.current !== undefined) clearTimeout(timer.current);
        };
    }, [clickedOutside, handleClose]);

    const changeTarget = (newTarget: HTMLElement | null) => {
        setTarget(newTarget);
    };

    return {
        target,
        visible,
        contentRef,
        handleOpen,
        handleClose,
        changeTarget,
    };
};
