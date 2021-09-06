import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import createSagaMiddleware from '@redux-saga/core';
import musicListReducer from '../features/musicList/musicListSlice';
import saga from '../rootSaga';

const sagaMiddleware = createSagaMiddleware();

const middleware = [...getDefaultMiddleware({ thunk: false }), sagaMiddleware];

export const store = configureStore({
  reducer: {
    musicList: musicListReducer,
  },
  middleware,
});

sagaMiddleware.run(saga);
