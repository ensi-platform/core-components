import { type MutableRefObject, type RefObject, useCallback, useEffect, useState } from 'react';

export type InputMethod = 'keyboard' | 'mouse';

let prevInputMethod: InputMethod;

function handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Tab') {
        prevInputMethod = 'keyboard';
    }
}

function handleMouseDown() {
    prevInputMethod = 'mouse';
}

function handleTouchStart() {
    prevInputMethod = 'mouse';
}

/**
 * Add several global handlers and track the input method - mouse or keyboard
 * Note: calling the function again does not duplicate the handlers
 */
function addGlobalListeners() {
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('touchstart', handleTouchStart);
}

/**
 * Hook sets the event handler to focusin and focusout
 * for a specific type of event
 * @param node The element on which the handler will be installed (default = document)
 * @param inputMethod If the parameter is not specified, set a handler for any focus event
 */
export function useFocus<T extends HTMLElement>(
    ref: MutableRefObject<T> | RefObject<T>,
    inputMethod?: InputMethod
): [boolean] {
    const [focus, setFocus] = useState(false);

    const handleFocus = useCallback(() => {
        if (!inputMethod || inputMethod === prevInputMethod) {
            setFocus(true);
        }
    }, [inputMethod]);

    const handleBlur = useCallback(() => {
        setFocus(false);
    }, []);

    useEffect(() => {
        const node = ref.current;

        if (node) {
            node.addEventListener('focusin', handleFocus);
            node.addEventListener('focusout', handleBlur);
        }

        return () => {
            if (node) {
                node.removeEventListener('focusin', handleFocus);
                node.removeEventListener('focusout', handleBlur);
            }
        };
    }, [handleBlur, handleFocus, ref]);

    useEffect(addGlobalListeners, []);

    return [focus];
}
