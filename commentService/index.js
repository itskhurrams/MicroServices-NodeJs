const express = require('express');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

const port = process.env.PORT || 9001;

const app = express();
app.use(express.json());
app.use(cors());
const commentsByPostId = {};

app.get('/posts/:id/comments', (httpRequest, httpResponse, next) => {
  httpResponse.send(commentsByPostId[httpRequest.params.id] || []);
});

app.post('/posts/:id/comments', async (httpRequest, httpResponse, next) => {
  const commentId = randomBytes(4).toString('hex');
  const { content } = httpRequest.body;
  const comments = commentsByPostId[httpRequest.params.id] || [];
  comments.push({
    id: commentId,
    content,
    status: 'pending',
  });
  commentsByPostId[httpRequest.params.id] = comments;

  await axios.post('http://localhost:9900/events', {
    type: 'commentCreated',
    data: {
      id: commentId,
      postId: httpRequest.params.id,
      content,
      status: 'pending',
    },
  });
  httpResponse.status(201).send(comments);
});
app.post('/events', async (httpRequest, httpResponse, next) => {
  const { type, data } = httpRequest.body;

  if (type === 'commentModerated') {
    const { postId, id, status, content } = data;
    const comments = commentsByPostId[postId];

    const comment = comments.find((comment) => {
      return comment.id === id;
    });
    comment.status = status;

    await axios.post('http://localhost:9900/events', {
      type: 'commentUpdated',
      data: {
        id,
        status,
        postId,
        content,
      },
    });
  }

  httpResponse.send({});
});

app.listen(port, () => console.log(`listening on http://localhost:${port}`));
