import { useEffect, useRef, useState } from 'react';

/**
 * Хук для отложенного изменения состояния флага из true в false.
 * Используется для предотвращения рваных анимаций когда
 * запрос иногда выполняется слишком быстро
 * @param isLoading Управляемое извне состояние 
 * @param deferringTime Минимальное время в течение которого
 * isLoading остается true, прежде чем стать false
 * @returns
 */
export const useDeferredLoading = (isLoading: boolean, deferringTime = 150) => {
    const [deferredIsLoading, setDeferredIsLoading] = useState(isLoading);
    const timeOut = useRef<ReturnType<typeof setTimeout>>();

    useEffect(() => {
        if (!isLoading) {
            if (timeOut.current) clearTimeout(timeOut.current);
            timeOut.current = setTimeout(() => {
                setDeferredIsLoading(false);
            }, deferringTime);
        }

        return () => {
            if (timeOut.current) clearTimeout(timeOut.current);
        };
    }, [isLoading, deferringTime]);

    return deferredIsLoading;
};

