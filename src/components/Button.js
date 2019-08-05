import React from 'react';
import styled from 'styled-components';

const ButtonComponent = styled.button`
  border: 0px solid #007cc7;
  -webkit-box-shadow: #b4b5b5 1px 1px 1px;
  -moz-box-shadow: #b4b5b5 1px 1px 1px;
  box-shadow: #b4b5b5 1px 1px 1px;
  -webkit-border-radius: 15px;
  -moz-border-radius: 15px;
  border-radius: 15px;
  font-size: 25px;
  font-family: arial, helvetica, sans-serif;
  padding: 15px;
  text-decoration: none;
  display: inline-block;
  text-shadow: -1px -1px 0 rgba(0, 0, 0, 0.3);
  font-weight: bold;
  color: #ffffff;
  background-color: #009fff;
  background-image: -webkit-gradient(
    linear,
    left top,
    left bottom,
    from(#009fff),
    to(#ec2f4b)
  );
  background-image: -webkit-linear-gradient(top, #009fff, #ec2f4b);
  background-image: -moz-linear-gradient(top, #009fff, #ec2f4b);
  background-image: -ms-linear-gradient(top, #009fff, #ec2f4b);
  background-image: -o-linear-gradient(top, #009fff, #ec2f4b);
  background-image: linear-gradient(to bottom, #009fff, #ec2f4b);
  filter: progid:DXImageTransform.Microsoft.gradient(GradientType=0,startColorstr=#009FFF, endColorstr=#EC2F4B);

  :hover {
    border: 0px solid #005f99;
    background-color: #007fcc;
    background-image: -webkit-gradient(
      linear,
      left top,
      left bottom,
      from(#007fcc),
      to(#ec2f4b)
    );
    background-image: -webkit-linear-gradient(top, #007fcc, #ec2f4b);
    background-image: -moz-linear-gradient(top, #007fcc, #ec2f4b);
    background-image: -ms-linear-gradient(top, #007fcc, #ec2f4b);
    background-image: -o-linear-gradient(top, #007fcc, #ec2f4b);
    background-image: linear-gradient(to bottom, #007fcc, #ec2f4b);
    filter: progid:DXImageTransform.Microsoft.gradient(GradientType=0,startColorstr=#007fcc, endColorstr=#EC2F4B);
  }

  display: flex;
  cursor: pointer;
`;

const Button = ({ children, onClick }) => (
  <ButtonComponent onClick={onClick}>{children}</ButtonComponent>
);

export default Button;
