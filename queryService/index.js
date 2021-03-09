const express = require('express');
const axios = require('axios');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const port = process.env.PORT || 9002;

const app = express();
app.use(express.json());
app.use(cors());

app.get('/posts', (httpRequest, httpResponse, next) => {
  httpResponse.send(posts);
});

const handleEvents = (type, data) => {
  if (type === 'postCreated') {
    const { id, title } = data;
    posts[id] = { id, title, comments: [] };
  }

  if (type === 'commentCreated') {
    const { id, postId, content, status } = data;
    const post = posts[postId];
    console.log({ id: id, content: content, status: status });

    post.comments.push({ id: id, content: content, status: status });
  }

  if (type === 'commentUpdated') {
    console.log('commentUpdated event Received');
    const { id, content, postId, status } = data;

    const post = posts[postId];
    const comment = post.comments.find((comment) => {
      return comment.id === id;
    });

    comment.status = status;
    comment.content = content;
  }
};
const posts = {};

app.post('/events', (httpRequest, httpResponse, next) => {
  const { type, data } = httpRequest.body;
  handleEvents(type, data);

  httpResponse.send({ status: 'OK' });
});

app.listen(port, async () => {
  console.log(`listening on http://localhost:${port}`);

  const response = await axios.get('http://localhost:9900/events');
  for (const eventData of response.data) {
    handleEvents(eventData.type, eventData.data);
  }
});
