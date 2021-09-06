import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import CardComponent from '../../../commonComponents/cardComponent/components/CardComponent';
import { selectors, setFavorite } from '../musicListSlice';
import ScrollToTop from '../../../commonComponents/scrollToTop/components/ScrollToTop';
import styles from '../../../styles/featureComponents/musicList/favorites.module.css';

const NO_FAVORITE_ALBUM_MESSAGE = 'Hmmm... Looks like you have not chosen any album as your favorite!';

function Favorites() {
  const dispatch = useDispatch();
  const history = useHistory();
  const albumList = useSelector(selectors.base).albums || [];

  // Function handling favorite checkbox click
  const handleFavoriteClick = (id) => {
    dispatch(setFavorite(id));
  };

  // Function handling album click
  const handleAlbumClick = (details) => {
    const redirectLocation = '/album-details';
    history.push(redirectLocation, { details });
  };

  // Filters out all the albums user has chosen as his/her fevorite based on isFavorite flag
  const getFavoriteAlbums = () => {
    const favoriteAlbums = albumList.filter((album) => album.isFavorite === true);
    if (favoriteAlbums.length) {
      return favoriteAlbums.map((album) => (
        <CardComponent
          key={album.id.attributes['im:id']}
          details={album}
          handleFavoriteClick={handleFavoriteClick}
          handleAlbumClick={handleAlbumClick}
        />
      ));
    }
    return <span><h2>{NO_FAVORITE_ALBUM_MESSAGE}</h2></span>;
  };

  return (
    <div className={styles.favoriteMusicContainer}>
      {getFavoriteAlbums()}
      <ScrollToTop />
    </div>
  );
}

export default Favorites;
