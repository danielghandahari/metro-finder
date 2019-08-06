import React from 'react';
import styled from 'styled-components';

const Div = styled.div`
  font-size: 20px;
  color: grey;
  text-align: center;

  @media screen and (max-width: 768px) {
    font-size: 14px;
  }
`;

const Text = ({ children }) => <Div>{children}</Div>;

export default Text;
