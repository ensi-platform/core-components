'use client';

import type { CSSObject } from '@emotion/react';

import deepmerge from 'deepmerge';
import { type FC, useMemo } from 'react';

import type { IPictureProps } from './types';

const EMPTY_CSS: CSSObject = {};

export const Picture: FC<IPictureProps> = ({
    imgClassName,
    imgCSS = EMPTY_CSS,
    sources,
    width,
    height,
    alt,
    decoding = 'auto',
    loading = 'lazy',
    priority,
    ...props
}) => {
    const [main, ...rest] = typeof sources === 'string' ? [{ image: sources }] : sources;

    const imgCSSInner = useMemo(
        () =>
            deepmerge.all<CSSObject>([
                imgCSS,
                {
                    objectFit: 'contain',
                    width: '100%',
                },
            ]),
        [imgCSS]
    );
    return (
        <>
            {priority && <link key={main.image} href={main.image} rel={priority} as="image" />}

            <picture
                css={{
                    display: 'flex',
                    height: '100%',
                }}
                {...props}
            >
                {rest.map(s => (
                    <source key={`${s.image}-${s.media}`} srcSet={s.image} media={s.media} />
                ))}

                <img
                    className={imgClassName}
                    css={imgCSSInner}
                    src={main.image}
                    width={width}
                    height={height}
                    decoding={decoding}
                    loading={loading}
                    alt={alt}
                />
            </picture>
        </>
    );
};
