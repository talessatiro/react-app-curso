import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '.';

const fn = jest.fn();

describe('<Button />', () => {
  it('should render the button with the text "Load More"', () => {
    render(<Button text="Load more" actionFn={fn} />);

    expect.assertions(1);

    const button = screen.getByRole('button', {
      name: /load more/i,
    });

    expect(button).toBeInTheDocument();
  });

  it('should call function when the button is clicked', () => {
    render(<Button text="Load more" actionFn={fn} />);

    const button = screen.getByRole('button', {
      name: /load more/i,
    });

    userEvent.click(button);

    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('should disable the button when disabled property is true', () => {
    render(<Button text="Load more" disabled={true} actionFn={fn} />);

    const button = screen.getByRole('button', {
      name: /load more/i,
    });

    expect(button).toBeDisabled();
  });

  it('should enable the button when disabled property is false', () => {
    render(<Button text="Load more" disabled={false} actionFn={fn} />);

    const button = screen.getByRole('button', {
      name: /load more/i,
    });

    expect(button).toBeEnabled();
  });

  it('should enable the button if disabled property is not used', () => {
    render(<Button text="Load more" actionFn={fn} />);

    const button = screen.getByRole('button', {
      name: /load more/i,
    });

    expect(button).toBeEnabled();
  });
});
