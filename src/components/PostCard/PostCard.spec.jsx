import { render, screen } from '@testing-library/react';
import { PostCard } from '.';
import { postCardPropsMock } from './mock';

const props = postCardPropsMock;

describe('<PostCard />', () => {
  it('should render the component correctly using its specific properties', () => {
    render(<PostCard {...props} />);

    const image = screen.getByRole('img', { name: props.title });

    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', props.cover);

    // heading h2
    const heading = screen.getByRole('heading', { name: `${props.title} ${props.id}` });
    expect(heading).toBeInTheDocument();

    const body = screen.getByText(props.body);
    expect(body).toBeInTheDocument();
  });

  it('should match the snapshot', () => {
    const { container } = render(<PostCard {...props} />);

    expect(container.firstChild).toMatchSnapshot();
  });
});
