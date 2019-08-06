import React from 'react';
import styled from 'styled-components';
import { shadow } from '../utils.js/variables';

const Div = styled.div`
  display: flex;
  align-items: flex-start;
  border-radius: 15px;
  padding: 40px 50px;
  background-color: #fafafa;
  overflow: scroll;
  max-height: 55vh;
  box-shadow: ${shadow};
`;

const Modal = ({ children }) => <Div>{children}</Div>;

export default Modal;
