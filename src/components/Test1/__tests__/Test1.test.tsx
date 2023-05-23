import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'

import Test from '../test1';

describe('Test component', () => {
    it('renders correctly', () => {
      const { getByTestId } = render(<Test />);
      const textElement = getByTestId('text');
      const inputElement = getByTestId ('input');
      expect(textElement).toBeInTheDocument();
      expect(inputElement).toBeInTheDocument();
    });

    it('updates text when input value changes', () => {
      const { getByTestId } = render(<Test />);
      const textElement = getByTestId('text');
      const inputElement = getByTestId ('input');
      fireEvent.change(inputElement, { target: { value: 'test' } });
      expect(textElement).toHaveTextContent('test');
    });
  });
