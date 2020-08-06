import React from 'react';

import { Backdrop, CircularProgress } from '@material-ui/core';

type LoaderProps = {
  loading: boolean;
};

const Loader: React.FC<LoaderProps> = ({ loading }) => {
  return (
    <Backdrop open={loading}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default Loader;
