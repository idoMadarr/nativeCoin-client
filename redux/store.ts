import {configureStore} from '@reduxjs/toolkit';
import {combineReducers} from 'redux';
import marketSlice from './slices/marketSlice';

const rootReducer = combineReducers({
  marketSlice,
});

const store = configureStore({
  reducer: rootReducer,
  // middleware: getDefaultMiddleware => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
