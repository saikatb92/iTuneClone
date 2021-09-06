import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { Button, Image } from 'react-bootstrap';
import styles from '../../../styles/featureComponents/musicList/albumDetails.module.css';

function AlbumDetails({ location }) {
  const history = useHistory();

  useEffect(() => {
    if (!location.state) {
      history.push('/top-100-albums');
    }
  }, []);

  const { details } = location.state;

  const handleHref = () => {
    window.open(details.link.attributes.href, '_blank');
  };

  return (
    <div className={styles.detailsContainer}>
      <div className={styles.coverImage}>
        <Image src={details['im:image'][2].label} rounded />
      </div>
      <div className={styles.itunesLinkButton}>
        <Button variant="danger" onClick={handleHref}>Listen in iTunes</Button>
      </div>
      <div className={styles.details}>
        <span><h3>{details['im:name'].label}</h3></span>
        <span><h5>{details['im:artist'].label}</h5></span>
        <span><i>{`${details['im:contentType'].attributes.label} ${details['im:contentType']['im:contentType'].attributes.label}  (${details['im:itemCount'].label} Songs)`}</i></span>
        <span><i>{`Price: ${details['im:price'].label}`}</i></span>
        <br />
        <span>{`Category: ${details.category.attributes.label}`}</span>
        <br />
        <span>{`Release date: ${details['im:releaseDate'].attributes.label}`}</span>
        <span>{`${details.rights.label}`}</span>
      </div>
      <div>
        {/* Price */}
      </div>
    </div>
  );
}

export default AlbumDetails;

AlbumDetails.propTypes = {
  location: PropTypes.object.isRequired,
};
