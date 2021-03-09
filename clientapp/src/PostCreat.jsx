import React, { useState } from 'react';
import axios from 'axios';

const PostCreat = () => {
  const [title, setTitle] = useState('');
  const onSubmit = async (event) => {
    event.preventDefault();
    axios.post('http://localhost:9000/posts', {
      title,
    });
    setTitle('');
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-control"
          />
        </div>
        <button className="btn btn-primary mt-3">submit</button>
      </form>
    </div>
  );
};

export default PostCreat;
