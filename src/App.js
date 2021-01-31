import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Routes from './routes';

import Providers from './context/Providers';

const App = () => {
  return (
    <BrowserRouter>
      <Providers>
        <Routes />
      </Providers>
    </BrowserRouter>
  );
};

export default App;
