import React, { useState } from 'react';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import styled, { createGlobalStyle } from 'styled-components';

import logo from './logo.svg';
import './App.css';
import LocationSearchInput from './components/LocationSearchInput';
import Header from './components/Header';
import { CONTENT_HIGHT } from './utils.js/variables';
import Button from './components/Button';

const query = 'http://localhost:3001/api/place';

const Global = createGlobalStyle`
  html, body {
    background-color: #FAFAFA;
    font-family: Muli;
  }
  ::selection {
    background: #FF8008;
    color: #FAFAFA;
  }

  .video {
    position: fixed;
    right: 0;
    bottom: 0;
    min-width: 100%; 
    min-height: 100%;
  }
`;

const Div = styled.div`
  background: #fafafa;

  .content-container {
    height: ${CONTENT_HIGHT};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .search {
      margin-bottom: 15px;
      display: flex;
      align-items: center;
    }

    .subways {
      border: solid red 2px;

      .subway {
        margin-bottom: 10px;
      }
    }
  }
`;

function App() {
  const [address, setAddress] = useState('');
  const [subways, setSubways] = useState(null);

  const onGo = async () => {
    setSubways(null);
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(async coordinates => {
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

        // TODO fixa status 200 men inga subways (majorna gbg)
        let resJson;
        if (res.status === 200) resJson = await res.json();

        if (resJson)
          setSubways(resJson.sort((a, b) => a.distanceValue - b.distanceValue));
      })
      .catch(error => console.error('Error: ', error));
  };

  const renderSubways = () => (
    <>
      {subways ? (
        <div className="subways">
          {subways.map((s, i) => (
            <div className="subway" key={i}>{`${s.name} → ${
              s.distanceTextRepr
            }`}</div>
          ))}
        </div>
      ) : null}
    </>
  );

  return (
    <Div>
      <Global />
      <Header />
      <div className="content-container">
        <div className="search">
          <LocationSearchInput
            handleChange={newAddress => setAddress(newAddress)}
            handleSelect={newAddress => setAddress(newAddress)}
            value={address}
          />
          <Button onClick={onGo}>GO</Button>
        </div>
        {renderSubways()}
      </div>
    </Div>
  );
}

export default App;
