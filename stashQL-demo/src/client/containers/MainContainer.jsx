import React from 'react';
import {
  BrowserRouter as Router, Routes, Route, useRoutes,
} from 'react-router-dom';
import StashQLHeaderMain from '../components/StashQLHeaderMain';
import StashQLBodyMain from '../components/StashQLBodyMain';

export default function MainContainer() {
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={(
            <>
              <StashQLHeaderMain />
              <StashQLBodyMain />
            </>
)}
        />

        <Route
          path="/Examples"
          element={(
            <StashQLBodyMain />
)}
        />
      </Routes>

    </div>

  );
}
