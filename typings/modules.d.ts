/// <reference types="@emotion/react/types/css-prop" />

declare module '*.svg' {
    import { type SVGRIcon } from '@customTypes/index';

    const SVG: SVGRIcon;
    export default SVG;
}

declare module '*.md' {
    const content: string;
    export default content;
}

declare module 'react-loading-skeleton';
declare module 'react-tabs';

type ListFormatOptions = {
    type?: 'conjunction' | 'disjunction' | 'unit';
    style?: 'long' | 'short' | 'narrow';
    localeMatcher?: 'lookup' | 'best fit';
};
declare namespace Intl {
    class ListFormat {
        constructor(locale: string, options?: ListFormatOptions);

        public format: (items: Array<string>) => string;
    }
}
