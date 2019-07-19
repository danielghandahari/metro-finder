const express = require('express');
const app = express();

var rp = require('request-promise');
const port = 3001;

var cors = require('cors');
app.use(cors());

require('dotenv').config();

const query =
  'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=59.336220,18.079210&type=subway_station&rankby=distance&key=AIzaSyCwZhKoccHJYFnxSQ5FPOsAqOYHJ7Kly2Y';

app.get('/api/place', async (req, res) => {
  const result = await rp(query);

  if (!result) res.send(400);
  res.send(result);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
