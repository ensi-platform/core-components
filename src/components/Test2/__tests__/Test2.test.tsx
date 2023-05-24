import { screen } from '@testing-library/dom';
import { fireEvent, render } from '@testing-library/react';

import Test from '../test1';

describe('Test component', () => {
    it('renders correctly', () => {
        const { getByTestId } = render(<Test />);
        const textElement = getByTestId('text');
        const inputElement = getByTestId('input');
        expect(textElement).toBeInTheDocument();
        expect(inputElement).toBeInTheDocument();
    });

    it('updates text when input value changes', async () => {
        const { getByTestId } = render(<Test />);
        const textElement = getByTestId('text');
        const inputElement = getByTestId('input');
        fireEvent.change(inputElement, { target: { value: 'test' } });
        fireEvent.click(await screen.findByText('Отправить'));
        expect(textElement).toHaveTextContent('test');
    });
});
