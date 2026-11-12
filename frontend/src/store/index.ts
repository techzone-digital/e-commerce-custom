import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    // Feature reducers will be registered here
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

