import { all } from 'redux-saga/effects';
import { watchComponentMount } from './features/musicList/sagas';

export default function* rootSaga() {
  yield all([
    watchComponentMount(),
  ]);
}
