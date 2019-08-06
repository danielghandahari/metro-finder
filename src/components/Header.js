import React from 'react';
import styled from 'styled-components';
import { shadow, HEADER_HIGHT } from '../utils.js/variables';
import metroLogo from '../assets/images/metro-logo.png';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fafafa;
  width: 100%;
  height: ${HEADER_HIGHT};
  box-shadow: ${shadow};
  border-bottom-left-radius: 80px;
  border-bottom-right-radius: 80px;

  .image {
    margin-top: 150px;
    width: 400px;
  }

  @media screen and (max-width: 768px) {
    border-bottom-left-radius: 40px;
    border-bottom-right-radius: 40px;
    height: calc(${HEADER_HIGHT} - 90px);

    .image {
      margin-top: 60px;
      width: 200px;
    }
  }
`;

const Header = () => {
  return (
    <Wrapper>
      <img className="image" src={metroLogo} alt="" />
    </Wrapper>
  );
};

export default Header;
