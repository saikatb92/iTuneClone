/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import HeartCheckbox from 'react-heart-checkbox';
import styles from '../../../styles/commonComponentsStyle/card.module.css';

function CardComponent({ details, handleFavoriteClick, handleAlbumClick }) {
  const albumID = details?.id?.attributes['im:id'];
  return (
    <div className={styles.cardContainer}>
      <Card className={styles.card}>
        <Card.Img variant="top" src={details['im:image'][2].label} alt="Album cover" onClick={() => handleAlbumClick(details)} />
        <Card.Body className={styles.cardBody}>
          <div className={styles.info}>
            <div className={styles.titleDiv} onClick={() => handleAlbumClick(details)}>
              <span>{details['im:name'].label}</span>
              <span className={styles.subtitle}><i>{details['im:artist'].label}</i></span>
            </div>
            <div className="favoriteCheckbox">
              <HeartCheckbox
                checked={details?.isFavorite}
                onClick={() => handleFavoriteClick(albumID)}
              />
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default CardComponent;

CardComponent.propTypes = {
  details: PropTypes.any.isRequired,
  handleFavoriteClick: PropTypes.func.isRequired,
  handleAlbumClick: PropTypes.func.isRequired,
};
