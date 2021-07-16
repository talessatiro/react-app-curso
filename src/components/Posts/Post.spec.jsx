import { render, screen } from '@testing-library/react';
import { Posts } from '.';
import { postsPropsMock } from './mock';

const props = postsPropsMock;

describe('<Post />', () => {
  it('should render the posts', () => {
    render(<Posts {...props} />);

    const headings = screen.getAllByRole('heading', { name: /title/i });
    expect(headings).toHaveLength(3);

    const images = screen.getAllByRole('img', { name: /title/i });
    expect(images).toHaveLength(3);

    const bodies = screen.getAllByText(/body/i);
    expect(bodies).toHaveLength(3);
  });

  it('should match the snapshot', () => {
    const { container } = render(<Posts {...props} />);

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should not render any post if there is no posts property', () => {
    render(<Posts />);

    const headings = screen.queryAllByRole('heading');
    expect(headings).toHaveLength(0);

    const images = screen.queryAllByRole('img');
    expect(images).toHaveLength(0);
  });
});
