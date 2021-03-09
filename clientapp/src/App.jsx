import React from 'react';
import PostCreat from './PostCreat';
import PostList from './PostList';

const App = () => {
  return (
    <div className="container">
      <h1>Create Post</h1>
      <PostCreat />
      <hr />
      <h1>Post List</h1>
      <PostList />
    </div>
  );
};
export default App;
