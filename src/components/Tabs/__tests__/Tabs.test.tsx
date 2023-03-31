import { fireEvent, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Tabs from '../index';

const tabs = [
    { id: '1', title: 'Tab 1', content: 'content 1' },
    { id: '2', title: 'Tab 2', content: 'content 2' },
    { id: '3', title: 'Tab 3', content: 'content 3' },
    { id: '4', title: 'Tab 4', content: 'content 4' },
    { id: '5', title: 'Tab 5 (disabled)', content: 'content 5 (disabled)', disabled: true },
];

const disabledIndex = 4;

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
        <Tabs dataTestId="tabs" mobile={mobile}>
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
