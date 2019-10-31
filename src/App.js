import React, { useState } from 'react';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import styled, { createGlobalStyle } from 'styled-components';
import 'typeface-muli';

import './App.css';
import LocationSearchInput from './components/LocationSearchInput';
import Header from './components/Header';
import { CONTENT_HIGHT, shadow } from './utils.js/variables';
import Button from './components/Button';
import arrow from '../src/assets/images/arrow.png';
import coverVideo from '../src/assets/videos/cover-video.mp4';
import Modal from './components/Modal';
import Text from './components/Text';
import Loading from './components/Loading';

const query = '/.netlify/functions/server/place';

const Global = createGlobalStyle`
  html, body {
    background-color: rgba(255, 255, 255, 0.85);
    font-family: Muli;
    overflow: hidden;
  }

  button {
    outline: none;
    cursor: pointer;
  }

  ::selection {
    background: #0082C8;
    color: #FAFAFA;
  }
`;

const Div = styled.div`
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

  .modal-button {
    background-image: linear-gradient(to right, #ed213a, #f2495d);
    font-weight: 900;
    padding: 11px;
    font-size: 18px;
    border-radius: 14px;
    border: none;
    color: #ffffff;
    box-shadow: ${shadow};
    margin-left: 20px;
  }

  @media screen and (max-width: 768px) {
    #video {
      display: none;
    }

    .search {
      transform: scale(0.85);
    }
  }
`;

function App() {
  const [address, setAddress] = useState('');
  const [subways, setSubways] = useState(null);
  const [noSubwaysText, setNoSubwaysText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onGo = async () => {
    setIsLoading(true);
    if (noSubwaysText.length) setNoSubwaysText('');
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

        let resJson;
        if (res.status === 200) {
          resJson = await res.json();
        } else if (res.status === 404) {
          setNoSubwaysText('There are no subways near the given address!');
        } else {
          setNoSubwaysText('Failed finding subways near the given address.');
        }

        if (resJson)
          setSubways(resJson.sort((a, b) => a.distanceValue - b.distanceValue));
        setIsLoading(false);
      })
      .catch(error => {
        setNoSubwaysText('Failed finding subways near the given address.');
        console.error('Error: ', error);
        setIsLoading(false);
      });
  };

  const renderSubways = () => (
    <Modal>
      <div>
        {subways.map((s, i) => (
          <div
            className="subway"
            key={i}
          >{`${s.name} → ${s.distanceTextRepr}`}</div>
        ))}
      </div>
      <button className="modal-button" onClick={() => setSubways(null)}>
        X
      </button>
    </Modal>
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
        {subways ? (
          <>{renderSubways()}</>
        ) : (
          <div className="search">
            <LocationSearchInput
              handleChange={newAddress => setAddress(newAddress)}
              handleSelect={newAddress => setAddress(newAddress)}
              value={address}
              onPressEnter={onGo}
            />
            <Button onClick={onGo}>
              <img src={arrow} alt="GO" width={30} height={30} />
            </Button>
          </div>
        )}
        <br />
        <Text>{noSubwaysText}</Text>
        <Loading isLoading={isLoading} />
      </div>
    </Div>
  );
}

export default App;
