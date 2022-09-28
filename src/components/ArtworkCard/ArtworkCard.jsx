import React, { useState, useEffect } from 'react';
import { Skeleton } from 'antd';
import { useNavigate } from 'react-router-dom';

import { getArtworkById } from '../../api';
import { IIIF_URL } from '../../constants';

import './ArtworkCard.scss';

const ArtworkCard = ({ data }) => {
  const [isFetching, setIsFetching] = useState(false);
  const [artworkDetail, setArtworkDetail] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  const navigate = useNavigate();

  const fetchArtworkById = async () => {
    const query = `/?fields=id,title,image_id,alt_image_ids,artist_title,dimension`;

    setIsFetching(true);
    const response = await getArtworkById(data.id, query);

    if (response.status === 200) {
      setIsFetching(false);
      setArtworkDetail(response.data.data);
    }
  };

  const onClickHandler = () => {
    navigate('/artwork/' + data.id);
  };

  useEffect(() => {
    fetchArtworkById();
  }, []);

  return (
    <div
      className='artwork'
      onMouseEnter={() => {
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
      }}
      onClick={onClickHandler}
      style={{
        display: artworkDetail?.image_id ? 'block' : 'none',
      }}
    >
      <div
        className={`${
          isHovered ? 'artwork--overlay__hovered' : ''
        } artwork--overlay`}
      >
        <div className='artwork--overlay--meta'>
          <p className='artwork--overlay--meta__artist'>{data.artist_title}</p>
          <p className='artwork--overlay--meta__title'>{data.title}</p>
        </div>
      </div>
      {artworkDetail?.image_id ? (
        <div className='artwork__image'>
          <img
            src={`${IIIF_URL}${artworkDetail?.image_id}/full/843,/0/default.jpg`}
            alt=''
            className='artwork__image'
            loading='lazy'
          />
        </div>
      ) : (
        <h1
          style={{
            color: 'red',
          }}
        >
          No Image
        </h1>
      )}
    </div>
  );
};

export default ArtworkCard;