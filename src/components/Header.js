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
  border-bottom-left-radius: 50px;
`;

const Header = () => {
  return (
    <Wrapper>
      <img className="image" src={metroLogo} alt="" height={'150vw'} />
    </Wrapper>
  );
};

export default Header;
