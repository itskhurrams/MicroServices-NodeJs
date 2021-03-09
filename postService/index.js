const express = require('express');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

const port = process.env.PORT || 9000;

const app = express();
app.use(express.json());
app.use(cors());

const postData = {};

app.get('/posts', (httpRequest, httpResponse, next) => {
  httpResponse.send(postData);
});

app.post('/posts', async (httpRequest, httpResponse, next) => {
  const id = randomBytes(4).toString('hex');
  const { title } = httpRequest.body;
  postData[id] = {
    id,
    title,
  };
  await axios.post('http://localhost:9900/events', {
    type: 'postCreated',
    data: {
      id,
      title,
    },
  });
  httpResponse.status(201).send(postData);
});

app.post('/events', (httpRequest, httpResponse, next) => {
  console.log('Event Received : ' + httpRequest.body.type);
  httpResponse.send({});
});
app.listen(port, () => console.log(`listening on http://localhost:${port}`));
