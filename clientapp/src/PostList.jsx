import React, { useState, useEffect } from 'react';
import axios from 'axios';

import CommentList from './CommentList';
import CommentCreate from './CommentCreate';

const PostList = () => {
  const [posts, setPosts] = useState({});

  const getPosts = async () => {
    const response = await axios.get('http://localhost:9002/posts');
    setPosts(response.data);
  };

  useEffect(() => {
    getPosts();
  }, []);

  const rendedPosts = Object.values(posts).map((post) => {
    return (
      <div className="card mb-2" style={{ width: '30%' }} key={post.id}>
        <div className="card-body">
          <h3>{post.title}</h3>
          <CommentList comments={post.comments} />
          <CommentCreate postId={post.id} />
        </div>
      </div>
    );
  });
  return (
    <div className="d-flex flex-row flex-wrap justify-content-between">
      {rendedPosts}
    </div>
  );
};

export default PostList;
