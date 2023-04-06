import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useEffect, useLayoutEffect, useState } from 'react';
import { renderToString } from 'react-dom/server';

import Tabs from '../index';

const tabs = [
    { id: '1', title: 'Tab 1', content: 'content 1' },
    { id: '2', title: 'Tab 2', content: 'content 2' },
    { id: '3', title: 'Tab 3', content: 'content 3' },
    { id: '4', title: 'Tab 4', content: 'content 4' },
    { id: '5', title: 'Tab 5 (disabled)', content: 'content 5 (disabled)', disabled: true },
];

const disabledIndex = 4;

afterEach(cleanup);

const mockIsomorphicState = {
    isSsr: false,
    useEffect,
    useLayoutEffect,
};

jest.mock('@scripts/hooks/useIsomorphicLayoutEffect', () => ({
    useIsomorphicLayoutEffect: jest.fn().mockImplementation((...args: [any, any]) => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        if (mockIsomorphicState.isSsr) return mockIsomorphicState.useEffect(...args);

        // eslint-disable-next-line react-hooks/exhaustive-deps
        return mockIsomorphicState.useLayoutEffect(...args);
    }),
}));

afterAll(() => jest.unmock('@scripts/hooks/useIsomorphicLayoutEffect'));

const SsrTabs = () => {
    const [isMounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <Tabs dataTestId="tabs">
            {tabs.map(tab => (
                <Tabs.Tab key={tab.id} id={tab.id} title={tab.title} dataTestId="tab" disabled={tab.disabled}>
                    {tab.content}
                </Tabs.Tab>
            ))}
            {isMounted && (
                <Tabs.Tab id="ssr" title={<span data-testid="ssr-tab-title">SSR tab</span>}>
                    SSR content
                </Tabs.Tab>
            )}
        </Tabs>
    );
};

describe('TabComponent', () => {
    it('supports SSR', () => {
        mockIsomorphicState.isSsr = true;

        const element = <SsrTabs />;
        const markup = renderToString(element);

        expect(markup).toContain('content 1');
        expect(markup).toContain('Tab 4');

        const container = document.createElement('div');
        document.body.appendChild(container);

        container.innerHTML = markup;

        mockIsomorphicState.isSsr = false;

        render(element, { hydrate: true, container });

        expect(screen.getByTestId('ssr-tab-title')).toHaveTextContent('SSR tab');
    });

    it('should unmount properly without remaining listeners and timers', () => {
        jest.useFakeTimers();
        const spy = jest.spyOn(window, 'removeEventListener');

        const { unmount } = render(
            <Tabs dataTestId="tabs">
                {tabs.map(tab => (
                    <Tabs.Tab key={tab.id} id={tab.id} title={tab.title} dataTestId="tab" disabled={tab.disabled}>
                        {tab.content}
                    </Tabs.Tab>
                ))}
            </Tabs>
        );

        unmount();

        jest.runAllTimers();

        expect(spy).toHaveBeenCalledTimes(0);

        jest.useRealTimers();
    });

    it('renders first tab by default', async () => {
        const { findByText, getByTestId } = render(
            <Tabs dataTestId="tabs" prefix="prefix__">
                {tabs.map(tab => (
                    <Tabs.Tab key={tab.id} id={tab.id} title={tab.title} dataTestId="tab" disabled={tab.disabled}>
                        {tab.content}
                    </Tabs.Tab>
                ))}
            </Tabs>
        );

        const component = getByTestId('tab');
        const foundByContent = await findByText(tabs[0].content);

        expect(component).toBe(foundByContent);
    });

    it('supports different themes', async () => {
        let themeName: any = 'secondary';

        const Component = () => (
            <Tabs dataTestId="tabs" theme={themeName as any}>
                {tabs.map(tab => (
                    <Tabs.Tab key={tab.id} id={tab.id} title={tab.title} dataTestId="tab" disabled={tab.disabled}>
                        {tab.content}
                    </Tabs.Tab>
                ))}
            </Tabs>
        );

        const { container, rerender } = render(<Component />);

        expect(container).toBeInTheDocument();

        themeName = {};

        rerender(<Component />);

        expect(container).toBeInTheDocument();
    });

    it('supports mobile and view', async () => {
        const Component = ({ mobile }: { mobile: boolean }) => (
            <Tabs dataTestId="tabs" isMobile={mobile}>
                {tabs.map(tab => (
                    <Tabs.Tab key={tab.id} id={tab.id} title={tab.title} dataTestId="tab" disabled={tab.disabled}>
                        {tab.content}
                    </Tabs.Tab>
                ))}
            </Tabs>
        );

        const { container, rerender } = render(<Component mobile />);

        expect(container).toBeInTheDocument();

        rerender(<Component mobile={false} />);

        expect(container).toBeInTheDocument();
    });

    it('click on non-disabled tab changes active tab', async () => {
        const { getByTestId, getAllByRole, getByText } = render(
            <Tabs dataTestId="tabs">
                {tabs.map(tab => (
                    <Tabs.Tab key={tab.id} id={tab.id} title={tab.title} dataTestId="tab" disabled={tab.disabled}>
                        {tab.content}
                    </Tabs.Tab>
                ))}
            </Tabs>
        );

        const buttons = getAllByRole('tab');
        const indicies: number[] = [];
        tabs.forEach((_, index) => {
            if (index !== disabledIndex) indicies.push(index);
        });

        const randomIndex = indicies[Math.floor(Math.random() * indicies.length)];
        const randomButton = buttons[randomIndex];

        fireEvent(
            randomButton,
            new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
            })
        );

        const activeTab = getByTestId('tab');

        const shouldBeActiveText = getByText(tabs[randomIndex].content);

        expect(activeTab).toBe(shouldBeActiveText);
    });

    it('click on disabled tab doesnt change active tab', async () => {
        const { getAllByRole, queryByText } = render(
            <Tabs dataTestId="tabs">
                {tabs.map(tab => (
                    <Tabs.Tab key={tab.id} id={tab.id} title={tab.title} dataTestId="tab" disabled={tab.disabled}>
                        {tab.content}
                    </Tabs.Tab>
                ))}
            </Tabs>
        );

        const buttons = getAllByRole('tab');
        const disabledButton = buttons[disabledIndex];

        fireEvent(
            disabledButton,
            new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
            })
        );

        const disabledContent = queryByText(tabs[disabledIndex].content);
        expect(disabledContent).toBeNull();
    });

    it('being focused, right arrow press + enter switched tab to next one', async () => {
        const user = userEvent.setup();

        const { getByText } = render(
            <Tabs dataTestId="tabs">
                {tabs.map(tab => (
                    <Tabs.Tab
                        key={tab.id}
                        id={tab.id}
                        title={tab.title}
                        dataTestId={`tab-${tab.id}`}
                        disabled={tab.disabled}
                    >
                        {tab.content}
                    </Tabs.Tab>
                ))}
            </Tabs>
        );

        await user.tab();

        await user.keyboard('[ArrowRight]');
        await user.keyboard('[Enter]');

        const element = getByText(tabs[1].content);
        expect(element).toBeTruthy();
    });

    it('has arrows loop', async () => {
        const user = userEvent.setup();

        const { getByText } = render(
            <Tabs dataTestId="tabs">
                {tabs.map(tab => (
                    <Tabs.Tab
                        key={tab.id}
                        id={tab.id}
                        title={tab.title}
                        dataTestId={`tab-${tab.id}`}
                        disabled={tab.disabled}
                    >
                        {tab.content}
                    </Tabs.Tab>
                ))}
            </Tabs>
        );

        await user.tab();

        for (let i = 0; i < tabs.length - 1; i += 1) {
            // eslint-disable-next-line no-await-in-loop
            await user.keyboard('[ArrowRight]');
        }

        await user.keyboard('[Enter]');

        const element = getByText(tabs[0].content);
        expect(element).toBeTruthy();
    });

    it('if click on non-disabled, fires handleChange', async () => {
        const onChange = jest.fn();

        const { getAllByRole } = render(
            <Tabs dataTestId="tabs" onChange={onChange} selectedId={tabs[0].id} theme="secondary">
                {tabs.map(tab => (
                    <Tabs.Tab key={tab.id} id={tab.id} title={tab.title} dataTestId="tab" disabled={tab.disabled}>
                        {tab.content}
                    </Tabs.Tab>
                ))}
            </Tabs>
        );

        const buttons = getAllByRole('tab');

        const randomButton = buttons[2];

        fireEvent(
            randomButton,
            new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
            })
        );

        expect(onChange).toHaveBeenCalled();
    });
});
