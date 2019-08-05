import React, { useState } from 'react';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import styled, { createGlobalStyle } from 'styled-components';
import 'typeface-muli';

import logo from './logo.svg';
import './App.css';
import LocationSearchInput from './components/LocationSearchInput';
import Header from './components/Header';
import { CONTENT_HIGHT } from './utils.js/variables';
import Button from './components/Button';
import arrow from '../src/assets/images/arrow.png';
import coverVideo from '../src/assets/videos/cover-video.mp4';

const query = 'http://localhost:3001/api/place';

const Global = createGlobalStyle`
  html, body {
    background-color: rgba(255, 255, 255, 0.85);
    font-family: Muli;
    overflow: hidden;
  }
  ::selection {
    background: #FF8008;
    color: #FAFAFA;
  }
`;

const Div = styled.div`
  // background-color: rgba(0, 0, 0, 0.05);

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

    .subway {
      margin-bottom: 10px;
      font-size: 18px;
      font-weight: 900;
      color: dodgerblue;
    }
  }

  #video {
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translateX(-50%) translateY(-50%);
    transform: translateX(-50%) translateY(-50%);
    min-width: 100%;
    min-height: 100%;
    width: auto;
    height: auto;
    z-index: -1000;
    overflow: hidden;
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
      {subways
        ? subways.map((s, i) => (
            <div className="subway" key={i}>{`${s.name} → ${
              s.distanceTextRepr
            }`}</div>
          ))
        : null}
    </>
  );

  return (
    <Div>
      <Global />
      <video autoPlay muted loop id="video">
        <source src={coverVideo} type="video/mp4" />
        Your browser does not support HTML5 video.
      </video>
      <Header />
      <div className="content-container">
        <div className="search">
          <LocationSearchInput
            handleChange={newAddress => setAddress(newAddress)}
            handleSelect={newAddress => setAddress(newAddress)}
            value={address}
          />
          <Button onClick={onGo}>
            <img src={arrow} alt="GO" width={30} height={30} />
          </Button>
        </div>
        {renderSubways()}
      </div>
    </Div>
  );
}

export default App;
