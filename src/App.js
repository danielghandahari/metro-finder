import React, { useState } from 'react';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

import logo from './logo.svg';
import './App.css';
import LocationSearchInput from './components/LocationSearchInput';

const query =
  'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=59.336220,18.079210&type=subway_station&rankby=distance&key=AIzaSyCwZhKoccHJYFnxSQ5FPOsAqOYHJ7Kly2Y';

function App() {
  const [address, setAddress] = useState('');

  const handleChange = address => {
    setAddress(address);
  };

  const handleSelect = address => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => console.log('Success', latLng))
      .catch(error => console.error('Error', error));
  };

  const onGo = async () => {
    const res = await fetch(query);
    console.log({ res });
  };

  return (
    <div className="App">
      <LocationSearchInput
        handleChange={handleChange}
        handleSelect={handleSelect}
        value={address}
      />
      <button onClick={onGo}>GO</button>
    </div>
  );
}

export default App;
