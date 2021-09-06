import { call, put, take } from 'redux-saga/effects';
import axios from 'axios';
import { componentDidMount, saveData, setErrors } from './musicListSlice';

const albumsAPIUrl = 'https://itunes.apple.com/us/rss/topalbums/limit=100/json';

const callAPI = (url) => axios.get(url);

function injectFavoriteField(albumList) {
  for (let i = 0; i < albumList.length; i += 1) {
    // eslint-disable-next-line no-param-reassign
    albumList[i].isFavorite = false;
  }
}

function* fetchAndSaveAPI() {
  try {
    const result = yield call(callAPI, albumsAPIUrl);
    const albumList = result.data?.feed?.entry || [];

    injectFavoriteField(albumList);

    yield put(saveData(albumList));
  } catch (e) {
    yield put(setErrors(e.message));
  }
}

export function* watchComponentMount() {
  while (true) {
    yield take(componentDidMount);
    yield call(fetchAndSaveAPI);
  }
}
