/**
 * Redux store конфигурация
 */

import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { nytimesApi } from '../services/nytimesApi';
import newsReducer from './newsSlice';

export const store = configureStore({
  reducer: {
    news: newsReducer,
    [nytimesApi.reducerPath]: nytimesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(nytimesApi.middleware),
});

// Включаем автоматический рефетчинг при фокусе/реконнекте
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;