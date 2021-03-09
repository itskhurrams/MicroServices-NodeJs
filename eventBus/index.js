const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(express.json());
const port = process.env.PORT || 9900;

const events = [];

app.post('/events', (httpRequest, httpResponse, next) => {
  const eventData = httpRequest.body;

  events.push(eventData);

  axios.post('http://localhost:9000/events', eventData);
  axios.post('http://localhost:9001/events', eventData);
  axios.post('http://localhost:9002/events', eventData);
  axios.post('http://localhost:9003/events', eventData);

  httpResponse.send({ status: 'OK' });
});

app.get('/events', (httpRequest, httpResponse, next) => {
  httpResponse.send(events);
});

app.listen(port, () => console.log(`listening on http://localhost:${port}`));
