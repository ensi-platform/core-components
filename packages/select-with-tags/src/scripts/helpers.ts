import type { SelectItem } from '@ensi-platform/core-components-select';

import type { OptionMatcher, SelectWithTagsProps } from '../types';

const getElementSize = (element: HTMLElement, property: string): number => {
    const size = +window.getComputedStyle(element).getPropertyValue(property).replace('px', '');

    return Number.isNaN(size) ? 0 : size;
};

const getTagWidth = (tag: HTMLElement) => {
    const tagMarginLeft = getElementSize(tag, 'margin-left');
    const tagMarginRight = getElementSize(tag, 'margin-right');

    return tag.getBoundingClientRect().width + tagMarginRight + tagMarginLeft;
};

export const calculateTotalElementsPerRow = (container: HTMLDivElement, input?: HTMLInputElement | null): number => {
    let containerWidth = container.getBoundingClientRect().width;
    const containerPaddingLeft = getElementSize(container, 'padding-left');
    const containerPaddingRight = getElementSize(container, 'padding-right');

    containerWidth -= containerPaddingLeft + containerPaddingRight;

    if (input) {
        const inputMinWidth = getElementSize(input, 'min-width');
        const inputMarginLeft = getElementSize(input, 'margin-left');
        const inputMarginRight = getElementSize(input, 'margin-right');
        const minInputWidth = inputMarginLeft + inputMarginRight + inputMinWidth;

        containerWidth -= minInputWidth;
    }

    const tags = container.querySelectorAll('[data-role="tag-button"]') as any as HTMLElement[];
    const latestTag = tags[tags.length - 1];

    if (latestTag && latestTag.getAttribute('data-collapse') === 'collapse-last-tag-element') {
        containerWidth -= getTagWidth(latestTag);
    }
    let totalTagsWidth = 0;
    let totalVisibleElements = 0;

    for (let i = 0; i < tags.length; i += 1) {
        const tag = tags[i];

        if (tag.getAttribute('data-collapse') === 'collapse-last-tag-element') {
            break;
        }
        totalTagsWidth += getTagWidth(tag);

        if (totalTagsWidth < containerWidth) {
            totalVisibleElements += 1;
        }
    }

    return totalVisibleElements;
};

const defaultMatch: OptionMatcher = (option, inputValue) =>
    option.label.toLowerCase().indexOf(`${inputValue}`.toLowerCase(), 0) !== -1;

export const filterOptions = (options: SelectWithTagsProps['options'], inputValue: string, match = defaultMatch) =>
    (options as SelectItem[]).filter(option => match(option, inputValue));
