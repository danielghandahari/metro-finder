const express = require('express');
const app = express();

require('dotenv').config();
var rp = require('request-promise');
const port = 3001;

var cors = require('cors');
app.use(cors());

const distance = require('google-distance-matrix');
distance.mode('walking');
distance.key(process.env.GOOGLE_MAPS_API_KEY);

const bodyParser = require('body-parser');
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);
app.use(bodyParser.json());

app.post('/api/place', async (req, res) => {
  const { coordinates, address } = req.body;
  if (!coordinates || !address) res.sendStatus(422);

  const result = await getNearestSubways(coordinates);

  const subways = result.map(r => r.name);

  if (!subways.length) res.send('Failed finding subways');
  const subwayDistances = await getSubwayDistances(subways, address);

  if (!result || !subways || !subwayDistances) res.sendStatus(404);
  res.send(subwayDistances);
});

async function getSubwayDistances(subways, address) {
  // const {
  //   rows: [{ elements }],
  // } = await getDistancePromise([address], subways);

  const distances = await getDistancePromise([address], subways);
  const elements =
    distances &&
    distances.rows &&
    distances.rows.length &&
    distances.rows[0].elements;

  // TODO throw error
  if (!elements.length || subways.length !== elements.length) return null;

  let finalSubways = [];
  for (let i = 0; i < subways.length; i++) {
    if (elements[i].status === 'OK') {
      finalSubways.push({
        name: subways[i],
        distanceValue: elements[i]['distance']['value'],
        distanceTextRepr: elements[i]['distance']['text'],
      });
    }
  }

  return finalSubways;
}

async function getNearestSubways(coordinates) {
  if (coordinates.lat && coordinates.lng) {
    const query = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${
      coordinates.lat
    },${coordinates.lng}&type=subway_station&rankby=distance&key=${
      process.env.GOOGLE_MAPS_API_KEY
    }`;
    const res = await rp(query);
    const resJson = JSON.parse(res);

    if (resJson && resJson.results) return resJson.results;
  }
}

/**
 * Wraps google's distance function
 * in a promise
 * @param origins
 * @param destinations
 */
function getDistancePromise(origins, destinations) {
  return new Promise((resolve, reject) => {
    distance.matrix(origins, destinations, function(err, distances) {
      if (!err) resolve(distances);
      reject(err);
    });
  });
}

app.listen(port, () => console.log(`Listening on port ${port}!`));
