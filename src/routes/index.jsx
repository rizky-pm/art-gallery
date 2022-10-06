import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Detail from '../pages/Detail/Detail';

import Home from '../pages/Home/Home';
import Artworks from '../layout/Artworks/Artworks';

const Router = () => {
  return (
    <>
      <Routes>
        <Route path='/aic-online-gallery/' element={<Home />}>
          <Route path='t/:tag' element={<Artworks />} />
          <Route path='s/:keyword' element={<Artworks />} />
          <Route path='/aic-online-gallery/' index element={<Artworks />} />
        </Route>
        <Route
          path='aic-online-gallery/artwork/:artworkId'
          element={<Detail />}
        />
      </Routes>
    </>
  );
};

export default Router;