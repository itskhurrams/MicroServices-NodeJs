const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

const port = process.env.PORT || 9003;

const app = express();
app.use(express.json());

app.post('/events', async (httpRequest, httpResponse, next) => {
  const { type, data } = httpRequest.body;

  if (type === 'commentCreated') {
    const status = data.content.includes('orange') ? 'rejected' : 'approved';

    await axios.post('http://localhost:9900/events', {
      type: 'commentModerated',
      data: {
        id: data.id,
        postId: data.postId,
        status,
        content: data.content,
      },
    });
  }

  httpResponse.send({});
});

app.listen(port, () => console.log(`listening on http://localhost:${port}`));
