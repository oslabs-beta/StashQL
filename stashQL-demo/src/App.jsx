import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import MainContainer from './client/containers/MainContainer';
import HeaderContainer from './client/containers/HeaderContainer';

function App() {
  return (
    <BrowserRouter>
      <div>
        <HeaderContainer />
        <MainContainer />
      </div>
    </BrowserRouter>
  );
}

export default App;
