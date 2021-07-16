import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TextInput } from '.';

const fn = jest.fn();
const inputValue = 'test';

describe('<TextInput />', () => {
  it('should have a value when the inputValue property is used', () => {
    render(<TextInput actionFn={fn} inputValue={inputValue} />);

    const input = screen.getByPlaceholderText('Type your search');
    expect(input).toBeInTheDocument();
    expect(input.value).toBe(inputValue);
  });

  it('should call handleChange function on each key pressed', () => {
    render(<TextInput actionFn={fn} />);

    const input = screen.getByPlaceholderText('Type your search');

    userEvent.type(input, inputValue);
    expect(input.value).toBe(inputValue);
    expect(fn).toBeCalledTimes(inputValue.length);
  });

  it('should match the snapshot', () => {
    const { container } = render(<TextInput actionFn={fn} inputValue={inputValue} />);

    expect(container.firstChild).toMatchSnapshot();
  });
});
