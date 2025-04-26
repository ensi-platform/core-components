import type { CSSObject } from '@emotion/react';

import type { HTMLProps, ImgHTMLAttributes } from 'react';

export interface IPictureSource {
    media?: string;
    image: string;
}

export interface IPictureProps
    extends HTMLProps<HTMLPictureElement>,
        Pick<ImgHTMLAttributes<HTMLImageElement>, 'decoding' | 'loading'> {
    /**
     * sources images
     */
    sources: IPictureSource[] | string;
    /**
     * High priority image loading
     */
    priority?: 'preload' | 'prefetch';
    /**
     * image class
     */
    imgClassName?: string;
    /**
     * image css
     */
    imgCSS?: CSSObject;
}
