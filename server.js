const express = require('express');
const app = express();
const http = require('http').Server(app);
const events = require('./mockData');

app.use(express.static('./build'));

app.get('/', (req, res) => {
  res.sendFile('./build/index.html');
});

app.get('/events', (req, res) => {
  res.json(events);
});

http.listen(3000, () => {
	console.log('server is up and running');
});
