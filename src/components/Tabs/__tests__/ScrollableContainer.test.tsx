import { render } from '@testing-library/react';
import * as scrollIntoView from 'compute-scroll-into-view';
import { createRef } from 'react';

import { ScrollableContainer } from '../components/ScrollableContainer';
import { TabsThemeProvider } from '../context';
import { TABS_THEMES } from '../themes';

describe('ScrollableContainer', () => {
    it('follows selected item', async () => {
        const ref = createRef<HTMLButtonElement>();

        const Component = ({ child }: { child: any }) => (
            <TabsThemeProvider
                size="md"
                theme={TABS_THEMES.basic}
                variant="primary"
                state={{
                    isMobile: false,
                    collapsible: false,
                    scrollable: true,
                }}
                idPrefix=""
            >
                <ScrollableContainer activeChild={child}>
                    <div
                        css={{
                            width: '100%',
                            overflowX: 'scroll',
                            display: 'flex',
                            flexWrap: 'nowrap',
                            button: { flexShrink: 0 },
                        }}
                    >
                        <button ref={ref} type="button" role="tab">
                            any btn
                        </button>
                        {[...Array(25).keys()].map(e => (
                            <button key={e} type="button" role="tab">
                                Button {e}
                            </button>
                        ))}
                    </div>
                </ScrollableContainer>
            </TabsThemeProvider>
        );

        const { container, rerender } = render(<Component child={null} />);

        expect(container).toBeInTheDocument();

        const mockScroll = jest.spyOn(scrollIntoView, 'compute').mockImplementation(activeChild => [
            {
                el: container,
                top: 0,
                left: activeChild ? 100 : -100,
            },
        ]);

        rerender(<Component child={ref.current} />);

        expect(mockScroll).toHaveBeenCalled();
    });
});
