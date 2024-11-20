import { useMediaQuery } from '@ensi-platform/core-components-common';

import { forwardRef } from 'react';

import Modal from './Component';
import Content from './components/compound/Content';
import Footer from './components/compound/Footer';
import Header from './components/compound/Header';
import type { IModalResponsiveProps, View } from './types';

export type IPopupProps = IModalResponsiveProps;

const ModalResponsiveComponent = forwardRef<HTMLDivElement, IPopupProps>(
    ({ children, breakpoint = 1024, ...restProps }, ref) => {
        const [view] = useMediaQuery<View>(
            [
                ['mobile', `(max-width: ${breakpoint - 1}px)`],
                ['desktop', `(min-width: ${breakpoint}px)`],
            ],
            'desktop'
        );

        return (
            <Modal ref={ref} {...restProps} view={view} size={view === 'mobile' ? 'fullscreen' : restProps.size}>
                {children}
            </Modal>
        );
    }
);

export const Popup = Object.assign(ModalResponsiveComponent, {
    Header,
    Content,
    Footer,
});
