import { type SavedStyle, getModalStore } from './store';

export const isScrolledToTop = (target: HTMLElement) => target.scrollTop <= 0;

export const isScrolledToBottom = (target: HTMLElement) => {
    const scroll = target.scrollHeight - target.offsetHeight;
    return scroll - 0.5 <= target.scrollTop;
};

export const hasScrollbar = (target: HTMLElement) => target.scrollHeight > target.clientHeight;

export const getScrollbarSize = (() => {
    let cachedSize: number;

    return () => {
        if (cachedSize) return cachedSize;

        const scrollDiv = document.createElement('div');

        scrollDiv.style.width = '99px';
        scrollDiv.style.height = '99px';
        scrollDiv.style.position = 'absolute';
        scrollDiv.style.top = '-9999px';
        scrollDiv.style.overflow = 'scroll';

        document.body.appendChild(scrollDiv);
        const scrollbarSize = scrollDiv.offsetWidth - scrollDiv.clientWidth;

        document.body.removeChild(scrollDiv);

        cachedSize = scrollbarSize;
        return scrollbarSize;
    };
})();

const isOverflowing = (container: Element) => {
    if (document.body === container) {
        return window.innerWidth > document.documentElement.clientWidth;
    }

    return container.scrollHeight > container.clientHeight;
};

const getPaddingRight = (node: Element) => parseInt(window.getComputedStyle(node).paddingRight, 10) || 0;

export const restoreContainerStyles = (container: HTMLElement) => {
    const modalRestoreStyles = getModalStore().getRestoreStyles();

    const index = modalRestoreStyles.findIndex(s => s.container === container);
    const existingStyles = modalRestoreStyles[index];

    if (!existingStyles) return;

    existingStyles.modals -= 1;

    if (existingStyles.modals <= 0) {
        modalRestoreStyles.splice(index, 1);

        existingStyles.styles.forEach(({ value, el, key }) => {
            if (value) {
                el.style.setProperty(key, value);
            } else {
                el.style.removeProperty(key);
            }
        });
    }
};

export const handleContainer = (container?: HTMLElement) => {
    if (!container) return;

    const modalRestoreStyles = getModalStore().getRestoreStyles();

    const existingStyles = modalRestoreStyles.find(s => s.container === container);

    if (existingStyles) {
        existingStyles.modals += 1;
        return;
    }

    const containerStyles: SavedStyle[] = [];

    if (isOverflowing(container)) {
        // Calculates the size before applying `overflow hidden` to avoid ui defects
        const scrollbarSize = getScrollbarSize();

        containerStyles.push({
            value: container.style.paddingRight,
            key: 'padding-right',
            el: container,
        });
        // Calculating styles to get a real `padding` with the width of the scrollbar
        container.style.paddingRight = `${getPaddingRight(container) + scrollbarSize}px`;
    }

    const parent = container.parentElement;

    const scrollContainer =
        parent?.nodeName === 'HTML' && window.getComputedStyle(parent).overflowY === 'scroll' ? parent : container;

    // Blocking the scroll even if there is no scrollbar
    if (scrollContainer.style.overflow !== 'hidden') {
        containerStyles.push({
            value: scrollContainer.style.overflow,
            key: 'overflow',
            el: scrollContainer,
        });
    }

    scrollContainer.style.overflow = 'hidden';

    modalRestoreStyles.push({
        container,
        modals: 1,
        styles: containerStyles,
    });
};
