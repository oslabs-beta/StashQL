import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './containers/Home.jsx';
import Docs from './containers/Docs.jsx';
import Demo from './containers/Demo.jsx';
import Team from './containers/Team.jsx';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Home' element={<Home />} />
        <Route path='/Docs' element={<Docs />} />
        <Route path='/Demo' element={<Demo />} />
      </Routes>
    </Router>
  );
}

export default App;