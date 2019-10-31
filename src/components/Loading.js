import React from 'react';
import PropagateLoader from 'react-spinners/PropagateLoader';

const Loading = ({ isLoading }) => (
  <PropagateLoader
    sizeUnit={'px'}
    size={10}
    color={'#ec2f4b'}
    loading={isLoading}
  />
);

export default Loading;
