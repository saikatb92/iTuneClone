import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MastHead from '../../mastHead/components/MastHead';
import MusicList from '../../../features/musicList/components/MusicList';
import AlbumDetails from '../../../features/musicList/components/AlbumDetails';
import Favorites from '../../../features/musicList/components/Favorites';
import styles from '../../../styles/commonComponentsStyle/content.module.css';

function Content() {
  return (
    <Router>
      <MastHead />
      <div className={styles.content}>
        <Switch>
          <Route path="/" exact component={MusicList} />
          <Route path="/album-details" component={AlbumDetails} />
          <Route path="/top-100-albums" component={MusicList} />
          <Route path="/favorites" component={Favorites} />
          <Route default component={MusicList} />
        </Switch>
      </div>
    </Router>
  );
}

export default Content;
