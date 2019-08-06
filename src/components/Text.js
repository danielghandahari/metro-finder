import React from 'react';
import styled from 'styled-components';

const Div = styled.div`
  font-size: 20px;
  color: grey;
`;

const Text = ({ children }) => <Div>{children}</Div>;

export default Text;
