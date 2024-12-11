import { BaseModal } from '@ensi-platform/core-components-base-modal';
import { useMediaQuery, useThemeCSSPart } from '@ensi-platform/core-components-common';

import { type ForwardedRef, forwardRef, useMemo, useRef } from 'react';
import mergeRefs from 'react-merge-refs';

import { PopupContextProvider } from './context';
import { PopupSizesEnum, PopupVariantsEnum } from './scripts';
import { POPUP_THEMES } from './themes';
import type { IModalResponsiveProps, IPopupProps, PopupStateFullType, ViewType } from './types';

const PopupComponent = forwardRef<HTMLDivElement, IPopupProps>(
    (
        {
            theme = POPUP_THEMES.basic,
            size = PopupSizesEnum.md,
            variant = PopupVariantsEnum.primary,
            fixedPosition,
            children,
            className,
            view,
            flex,
            hasCloser = true,
            stickyFooter,
            stickyHeader,
            align,
            trim,
            innerScroll,
            ...restProps
        },
        ref: ForwardedRef<HTMLDivElement>
    ) => {
        const modalRef = useRef<HTMLElement>(null);

        const state = useMemo<PopupStateFullType>(
            () => ({
                size,
                variant,
                view,
                align,
                fixedPosition,
                flex,
                hasCloser,
                stickyFooter,
                stickyHeader,
                trim,
                innerScroll,
            }),
            [align, fixedPosition, flex, hasCloser, size, stickyFooter, stickyHeader, trim, view, innerScroll, variant]
        );

        const handleEntered = () => {
            if (fixedPosition && modalRef.current) {
                const content = modalRef.current.querySelector<HTMLElement>('[data-role="content"]');

                if (content) {
                    const { marginTop } = window.getComputedStyle(content);

                    content.style.marginTop = marginTop;
                }
            }
        };

        const baseModalProps =
            view === 'desktop'
                ? {
                      ref: mergeRefs([ref, modalRef]),
                      onMount: handleEntered,
                      backdropProps: {
                          invisible: size === 'fullscreen',
                          ...restProps.backdropProps,
                      },
                  }
                : {
                      ref,
                      className,
                  };

        const getCSS = useThemeCSSPart(theme, {
            ...state,
            size,
            variant,
        });

        return (
            <PopupContextProvider size={size} variant={variant} state={state} getCSS={getCSS}>
                <BaseModal
                    {...restProps}
                    css={getCSS('component')}
                    wrapperCSS={{
                        ...getCSS('wrapper'),
                        ...restProps.wrapperCSS,
                    }}
                    {...baseModalProps}
                >
                    {children}
                </BaseModal>
            </PopupContextProvider>
        );
    }
);

const PopupResponsiveComponent = forwardRef<HTMLDivElement, IModalResponsiveProps>(
    ({ children, breakpoint = 1024, ...restProps }, ref) => {
        const [view] = useMediaQuery<ViewType>(
            [
                ['mobile', `(max-width: ${breakpoint - 1}px)`],
                ['desktop', `(min-width: ${breakpoint}px)`],
            ],
            'desktop'
        );

        return (
            <PopupComponent
                ref={ref}
                {...restProps}
                view={view}
                size={view === 'mobile' ? 'fullscreen' : restProps.size}
            >
                {children}
            </PopupComponent>
        );
    }
);

export default PopupResponsiveComponent;
