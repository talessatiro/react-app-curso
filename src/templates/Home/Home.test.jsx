import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { Home } from '.';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import userEvent from '@testing-library/user-event';

const handlers = [
  rest.get('https://jsonplaceholder.typicode.com/posts', async (req, res, ctx) => {
    return res(
      ctx.json([
        {
          userId: 1,
          id: 1,
          title: 'title1',
          body: 'body1',
        },
        {
          userId: 2,
          id: 2,
          title: 'title2',
          body: 'body2',
        },
        {
          userId: 3,
          id: 3,
          title: 'title3',
          body: 'body3',
        },
      ]),
    );
  }),
  rest.get('https://jsonplaceholder.typicode.com/photos', async (req, res, ctx) => {
    return res(
      ctx.json([
        {
          albumId: 1,
          id: 1,
          title: 'title1',
          url: 'img1.png',
          thumbnailUrl: 'thumb-img1.png',
        },
        {
          albumId: 2,
          id: 2,
          title: 'title2',
          url: 'img2.png',
          thumbnailUrl: 'thumb-img2.png',
        },
        {
          albumId: 3,
          id: 3,
          title: 'title3',
          url: 'img3.png',
          thumbnailUrl: 'thumb-img3.png',
        },
      ]),
    );
  }),
];

const server = setupServer(...handlers);

describe('<Home />', () => {
  beforeAll(() => {
    server.listen();
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });

  it('should render search, posts and the load more button', async () => {
    render(<Home />);
    expect.assertions(3);

    const noMorePosts = screen.getByText('There is no posts =(');

    await waitForElementToBeRemoved(noMorePosts);

    const search = screen.getByPlaceholderText('Type your search');
    expect(search).toBeInTheDocument();

    const postImages = screen.getAllByRole('img');
    expect(postImages).toHaveLength(2);

    const loadMoreButton = screen.getByRole('button', { name: /load more posts/i });
    expect(loadMoreButton).toBeInTheDocument();
  });

  it('should search for posts when type some text in the search input', async () => {
    render(<Home />);
    const noMorePosts = screen.getByText('There is no posts =(');

    await waitForElementToBeRemoved(noMorePosts);
    const search = screen.getByPlaceholderText('Type your search');

    let heading1 = screen.getByRole('heading', { name: /title1 1/i });
    expect(heading1).toBeInTheDocument();
    let heading2 = screen.getByRole('heading', { name: /title2 2/i });
    expect(heading2).toBeInTheDocument();
    let heading3 = screen.queryByRole('heading', { name: /title3 3/i });
    expect(heading3).not.toBeInTheDocument();

    userEvent.type(search, 'title1');

    heading1 = screen.getByRole('heading', { name: /title1 1/i });
    expect(heading1).toBeInTheDocument();
    heading2 = screen.queryByRole('heading', { name: /title2 2/i });
    expect(heading2).not.toBeInTheDocument();
    heading3 = screen.queryByRole('heading', { name: /title3 3/i });
    expect(heading3).not.toBeInTheDocument();

    const searchHeading = screen.getByRole('heading', { name: 'Search value: title1' });
    expect(searchHeading).toBeInTheDocument();

    userEvent.clear(search);
    userEvent.type(search, 'title3');

    heading1 = screen.queryByRole('heading', { name: /title1 1/i });
    expect(heading1).not.toBeInTheDocument();
    heading2 = screen.queryByRole('heading', { name: /title2 2/i });
    expect(heading2).not.toBeInTheDocument();
    heading3 = screen.getByRole('heading', { name: /title3 3/i });
    expect(heading3).toBeInTheDocument();

    userEvent.clear(search);

    heading1 = screen.getByRole('heading', { name: /title1 1/i });
    expect(heading1).toBeInTheDocument();
    heading2 = screen.getByRole('heading', { name: /title2 2/i });
    expect(heading2).toBeInTheDocument();
    heading3 = screen.queryByRole('heading', { name: /title3 3/i });
    expect(heading3).not.toBeInTheDocument();
  });

  it('should show "There is no posts =(" message if there is no posts matching the input value', async () => {
    render(<Home />);
    const noMorePosts = screen.getByText('There is no posts =(');

    await waitForElementToBeRemoved(noMorePosts);
    const search = screen.getByPlaceholderText('Type your search');

    userEvent.type(search, 'just_to_test_no_posts_message');

    const noPostsMessage = screen.getByText('There is no posts =(');
    expect(noPostsMessage).toBeInTheDocument();
  });

  it('should remove the load more button if some value is typed in the search input', async () => {
    render(<Home />);
    const noMorePosts = screen.getByText('There is no posts =(');

    await waitForElementToBeRemoved(noMorePosts);
    const search = screen.getByPlaceholderText('Type your search');
    const loadMorePostsButton = screen.getByRole('button', { name: /load more posts/i });

    expect(loadMorePostsButton).toBeInTheDocument();
    userEvent.type(search, 'some_value');
    expect(loadMorePostsButton).not.toBeInTheDocument();
  });

  it('should load the third post and disable the load more button if there is no more posts to be loaded', async () => {
    render(<Home />);
    const noMorePosts = screen.getByText('There is no posts =(');

    await waitForElementToBeRemoved(noMorePosts);

    const loadMorePostsButton = screen.getByRole('button', { name: /load more posts/i });
    expect(loadMorePostsButton).toBeInTheDocument();
    expect(loadMorePostsButton).toBeEnabled();

    userEvent.click(loadMorePostsButton);
    expect(loadMorePostsButton).toBeDisabled();
    const heading3 = screen.getByRole('heading', { name: /title3 3/i });
    expect(heading3).toBeInTheDocument();
  });
});
