import { useState, useEffect, useRef, useCallback } from 'react';
import { ITooltipProps } from '../../types';

export const useTooltip = ({
    onOpenDelay,
    onCloseDelay,
    trigger,
    forcedOpen,
    onOpen,
    onClose,
}: ITooltipProps) => {
    const [visible, setVisible] = useState(!!forcedOpen);
    const [target, setTarget] = useState<HTMLElement | null>(null);
    const contentRef = useRef<HTMLDivElement | null>(null);
    const timer = useRef<number | null>(null);

    const open = useCallback(() => {
        if (!visible) {
            setVisible(true);
            if (onOpen) onOpen();
        }
    }, [onOpen, visible]);

    const close = useCallback(() => {
        if (visible) {
            setVisible(false);
            if (onClose) onClose();
        }
    }, [onClose, visible]);

    const handleOpen = useCallback(() => {
        if (trigger === 'hover') {
            if (timer.current) clearTimeout(timer.current);
            timer.current = window.setTimeout(open, onOpenDelay);
            return;
        }

        open();
    }, [onOpenDelay, open, trigger]);

    const handleClose = useCallback(() => {
        if (trigger === 'hover') {
            if (timer.current) clearTimeout(timer.current);
            timer.current = window.setTimeout(close, onCloseDelay);
            return;
        }

        close();
    }, [trigger, close, onCloseDelay]);

    const clickedOutside = useCallback(
        (node: Element): boolean => {
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
        const handleBodyClick = (event: MouseEvent | TouchEvent) => {
            if (clickedOutside(event.target as Element)) handleClose();
        };

        document.body.addEventListener('click', handleBodyClick);
        document.body.addEventListener('touchstart', handleBodyClick);

        return () => {
            document.body.removeEventListener('click', handleBodyClick);
            document.body.removeEventListener('touchstart', handleBodyClick);

            clearTimeout(timer.current);
        };
    }, [clickedOutside, handleClose]);

    const changeTarget= (newTarget) => {
        setTarget(newTarget)
    }

    return {
        target,
        visible,
        contentRef,
        handleOpen,
        handleClose,
        changeTarget,
    };
};
