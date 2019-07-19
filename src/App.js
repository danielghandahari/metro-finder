import React, { useState } from 'react';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

import logo from './logo.svg';
import './App.css';
import LocationSearchInput from './components/LocationSearchInput';

const query = 'http://localhost:3001/api/place';

function App() {
  const [address, setAddress] = useState('');
  const [subways, setSubways] = useState(null);

  const handleChange = address => {
    setAddress(address);
  };

  const handleSelect = address => {
    setAddress(address);
  };

  const onGo = async () => {
    setSubways(null);
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(async coordinates => {
        console.log({ coordinates });

        const res = await fetch(query, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            address,
            coordinates,
          }),
        });
        console.log({ res });

        // TODO fixa status 200 men inga subways (majorna gbg)
        let resJson;
        if (res.status === 200) resJson = await res.json();

        if (resJson)
          setSubways(resJson.sort((a, b) => a.distanceValue - b.distanceValue));
      })
      .catch(error => console.error('Error: ', error));
  };

  return (
    <div className="App">
      <LocationSearchInput
        handleChange={handleChange}
        handleSelect={handleSelect}
        value={address}
      />
      <button onClick={onGo}>GO</button>
      <>
        {subways ? (
          subways.map((s, i) => (
            <div key={i}>{`${s.name} | ${s.distanceTextRepr}`}</div>
          ))
        ) : (
          <div>Click GO to get closest subways!</div>
        )}
      </>
    </div>
  );
}

export default App;
