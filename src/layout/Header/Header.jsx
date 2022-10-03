import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import InputComponent from '../../components/InputComponent/InputComponent';

import './Header.scss';

import { getAllArtworks, getTotalPages } from '../../api';
import {
  querySelector,
  randomNumberWithMinMax,
  removeString,
  scrollToPosition,
} from '../../helper';

const Header = () => {
  const [headerData, setHeaderData] = useState({});
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const location = useLocation().pathname;
  let tag = removeString(useLocation().pathname, '/t/');
  const searchQuery = removeString(useLocation().pathname, '/s/');
  const offsetState = useSelector((state) => state.artworks.refOffSet);

  const scrollToPositionHandler = () => {
    scrollToPosition(offsetState);
  };

  const fetchAllArtworks = async () => {
    setPage((prevState) => prevState + 1);

    const query = tag.includes('/s/')
      ? querySelector(location, (tag = ''), searchQuery, page, totalPages)
      : querySelector(location, tag, searchQuery, page, totalPages);

    console.log(query);

    const response = await getAllArtworks(query);
    console.log(response);

    if (response.status === 200) {
      setHeaderData(response.data.data[randomNumberWithMinMax(0, 9)]);
    }
  };

  const fetchTotalPages = async () => {
    const query = `/search?limit=9&query[match][artwork_type_title]=${tag}&[exists][field]=image_id`;

    const response = await getTotalPages(query);

    if (response.status === 200) {
      setTotalPages(response.data.pagination.total_pages);
    }
  };

  useEffect(() => {
    setPage(1);
    fetchTotalPages();
    fetchAllArtworks();
  }, [location]);

  return headerData?.image_id ? (
    <header
      style={{
        backgroundImage: `url(https://www.artic.edu/iiif/2/${headerData?.image_id}/full/843,/0/default.jpg)`,
      }}
    >
      <div className='header--overlay'></div>
      <div className='header--content'>
        <h1 className='header--content__title'>Artlerry</h1>
        <p className='header--content__desc'>
          Home to a collection of art that spans centuries and the globe
        </p>
        <InputComponent type='default' onClick={scrollToPositionHandler} />

        {headerData && (
          <div className='header--content__credit'>
            <p className='header--content__credit--artist'>
              By {headerData?.artist_title}
            </p>
            <Link
              to={`/artwork/${headerData.id}`}
              className='header--content__credit--title'
            >
              {headerData?.title}
            </Link>
          </div>
        )}
      </div>
    </header>
  ) : null;
};

export default Header;
