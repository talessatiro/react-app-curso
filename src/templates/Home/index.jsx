import { Component } from 'react';

import './styles.css';

import { Posts } from '../../components/Posts';
import { loadPosts } from '../../util/load-posts';
import { Button } from '../../components/Button';
import { TextInput } from '../../components/TextInput';

export class Home extends Component {
  state = {
    allPosts: [],
    posts: [],
    page: 1,
    postsPerPage: 2,
    searchValue: ''
  }

  async componentDidMount() {
    await this.loadPosts();
  }

  loadPosts = async () => {
    const { postsPerPage } = this.state;
    const allPosts = await loadPosts();
    const posts = allPosts.slice(0, postsPerPage);

    this.setState({ posts, allPosts });
  }

  componentDidUpdate() {
  }

  componentWillUnmount() {
  }

  loadMorePosts = () => {
    const { page, postsPerPage, allPosts, posts } = this.state;

    const nextPage = page + 1;
    const startIn = posts.length;
    const finishIn = nextPage * postsPerPage;
    const nextPosts = allPosts.slice(startIn, finishIn);
    posts.push(...nextPosts);

    this.setState({ posts, page: nextPage });
  }

  handleSearchInputChange = (event) => {
    const { value } = event.target;

    this.setState({ searchValue: value });
  }


  render() {
    const { posts, postsPerPage, allPosts, page, searchValue } = this.state;
    const disableLoadMoreButton = page * postsPerPage >= allPosts.length;

    const filteredPosts = searchValue ?
      allPosts.filter(post => {
        return post.title.toLowerCase().includes(searchValue.toLowerCase());
      }) : posts;

    return (
      <section className="container">
        <div className="search-container">
          {
            searchValue && (
              <h1>Search value: {searchValue}</h1>
            )
          }
          <TextInput
            inputValue={searchValue}
            actionFn={this.handleSearchInputChange}
          />
        </div>

        {filteredPosts.length > 0 && (
          <Posts posts={filteredPosts} />
        )}

        {!filteredPosts.length && (
          <p> There is no posts =( </p>
        )}

        <div className="button-container">
          {
            !searchValue && (
              <Button
                text="Load More Posts"
                actionFn={this.loadMorePosts}
                disabled={disableLoadMoreButton} />
            )
          }
        </div>
      </section>
    );
  }
}