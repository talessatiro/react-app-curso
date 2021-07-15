import { useCallback, useEffect, useState } from 'react';

import './styles.css';

import { Posts } from '../../components/Posts';
import { loadPosts } from '../../util/load-posts';
import { Button } from '../../components/Button';
import { TextInput } from '../../components/TextInput';

export const Home = () => {
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [postsPerPage] = useState(10);
  const [searchValue, setSearchValue] = useState();

  const handleLoadPosts = useCallback(async (page, postsPerPage) => {
    const allPosts = await loadPosts();
    const posts = allPosts.slice(page, postsPerPage);

    setPosts(posts);
    setAllPosts(allPosts);
  }, []);

  useEffect(() => {
    handleLoadPosts(0, postsPerPage);
  }, [handleLoadPosts, postsPerPage]);

  const loadMorePosts = () => {
    const nextPage = page + 1;
    const startIn = posts.length;
    const finishIn = nextPage * postsPerPage;
    const nextPosts = allPosts.slice(startIn, finishIn);
    posts.push(...nextPosts);

    setPosts(posts);
    setPage(nextPage);
  }

  const handleSearchInputChange = (event) => {
    const { value } = event.target;

    setSearchValue(value);
  }


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
          actionFn={handleSearchInputChange}
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
              actionFn={loadMorePosts}
              disabled={disableLoadMoreButton} />
          )
        }
      </div>
    </section>
  );
}