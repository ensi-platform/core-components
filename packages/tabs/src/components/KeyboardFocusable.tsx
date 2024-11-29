import { type MutableRefObject, type RefObject, useCallback, useEffect, useRef, useState } from 'react';

type KeyboardFocusableProps = {
    /**
     * Render-props which will have ```ref``` and ```focused``` state passed
     *
     * Ref should be placed on an interactive element or one of its parent elements.
     */
    // eslint-disable-next-line no-undef
    children: (ref: RefObject<any>, focused: boolean) => JSX.Element;
};

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
 * Adds global event handlers and tracks input method - keyboard, mouse, touch.
 * Note: Multiple calls doesn't duplicate handlers
 */
function addGlobalListeners() {
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('touchstart', handleTouchStart);
}

/**
 * This hook adds event handlers for ```focusin``` and ```focusout``` events
 * @param ref ref for element on which the handler will be added (default = document)
 * @param inputMethod input type on which events should be handled, if omitted - all input methods are handled
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

export const KeyboardFocusable = ({ children }: KeyboardFocusableProps) => {
    const targetRef = useRef<HTMLElement | null>(null);

    const [focused] = useFocus(targetRef, 'keyboard');

    return children(targetRef, focused);
};

KeyboardFocusable.displayName = 'KeyboardFocusable';
