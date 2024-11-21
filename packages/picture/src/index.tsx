import type { CSSObject } from '@emotion/react';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import getImageBlurSvg from './scripts/getImageBlurSvg';
import handleLoading from './scripts/handleLoading';
import type { ImgElementWithDataProp, PictureProps } from './types';

function getInt(x: unknown): number | undefined {
    if (typeof x === 'number' || typeof x === 'undefined') {
        return x;
    }
    if (typeof x === 'string' && /^[0-9]+$/.test(x)) {
        return parseInt(x, 10);
    }
    return NaN;
}

export const Picture = ({
    sources,
    placeholder = 'empty',
    fadeCompleteCSS = {},
    fadeCSS = {},
    blurDataURL,
    PreloadComponent,
    style: imgStyle = {},
    width,
    height,
    onLoad,
    onError,
    onLoadingComplete,
    alt,
    ...restProps
}: PictureProps) => {
    const widthInt = getInt(width);
    const heightInt = getInt(height);

    const onLoadRef = useRef(onLoad);
    useEffect(() => {
        onLoadRef.current = onLoad;
    }, [onLoad]);

    const onLoadingCompleteRef = useRef(onLoadingComplete);
    useEffect(() => {
        onLoadingCompleteRef.current = onLoadingComplete;
    }, [onLoadingComplete]);

    const [blurComplete, setBlurComplete] = useState(false);
    const [fadeComplete, setFadeComplete] = useState(false);

    const fadeStyle: CSSObject =
        placeholder === 'fade'
            ? {
                  opacity: 0,
                  willChange: 'opacity',
                  transition: 'opacity 0.2s ease-in-out',
                  ...fadeCSS,
                  ...(fadeComplete && {
                      opacity: 1,
                      ...fadeCompleteCSS,
                  }),
              }
            : {};

    const blurStyle: CSSObject =
        placeholder === 'blur' && blurDataURL && !blurComplete
            ? {
                  backgroundSize: imgStyle.objectFit || 'cover',
                  backgroundPosition: imgStyle.objectPosition || '50% 50%',
                  backgroundRepeat: 'no-repeat',
                  backgroundImage: `url("data:image/svg+xml;charset=utf-8,${getImageBlurSvg({
                      widthInt,
                      heightInt,
                      blurWidth: widthInt,
                      blurHeight: heightInt,
                      blurDataURL,
                  })}")`,
              }
            : {};

    const srcSet = useMemo(() => sources.map(e => e.image), [sources]);
    const [showAltText, setShowAltText] = useState(false);

    return (
        <>
            {PreloadComponent ? (
                <PreloadComponent>
                    {sources.map(source => (
                        <link key={source.media} rel="preload" as="image" href={source.image} />
                    ))}
                </PreloadComponent>
            ) : null}
            <picture>
                {sources.map(source => (
                    <source key={source.media} srcSet={source.image} media={source.media} />
                ))}
                <img
                    alt={alt}
                    {...restProps}
                    src={sources[0].image}
                    decoding="async"
                    css={{
                        ...imgStyle,
                        ...blurStyle,
                        ...fadeStyle,
                        ...(!showAltText && { color: 'transparent' }),
                    }}
                    width={width}
                    height={height}
                    ref={useCallback(
                        (img: ImgElementWithDataProp | null) => {
                            if (!img) {
                                return;
                            }
                            if (onError) {
                                // If the image has an error before react hydrates, then the error is lost.
                                // The workaround is to wait until the image is mounted which is after hydration,
                                // then we set the src again to trigger the error handler (if there was an error).
                                // eslint-disable-next-line no-self-assign
                                img.src = img.src;
                            }
                            if (process.env.NODE_ENV !== 'production') {
                                if (img.getAttribute('alt') === null) {
                                    console.error(
                                        `Picture is missing required "alt" property. Please add Alternative Text to describe the image for screen readers and search engines.`
                                    );
                                }
                            }

                            if (img.complete) {
                                handleLoading(
                                    img,
                                    srcSet,
                                    placeholder,
                                    onLoadRef,
                                    onLoadingCompleteRef,
                                    setBlurComplete,
                                    setFadeComplete
                                );
                            }
                        },
                        [srcSet, placeholder, onLoadRef, onLoadingCompleteRef, setBlurComplete, onError]
                    )}
                    onLoad={event => {
                        const img = event.currentTarget as ImgElementWithDataProp;
                        handleLoading(
                            img,
                            srcSet,
                            placeholder,
                            onLoadRef,
                            onLoadingCompleteRef,
                            setBlurComplete,
                            setFadeComplete
                        );
                    }}
                    onError={event => {
                        // if the real image fails to load, this will ensure "alt" is visible
                        setShowAltText(true);
                        if (placeholder === 'blur') {
                            // If the real image fails to load, this will still remove the placeholder.
                            setBlurComplete(true);
                        }
                        if (onError) {
                            onError(event);
                        }
                    }}
                />
            </picture>
        </>
    );
};
