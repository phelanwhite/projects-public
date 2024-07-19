// configureStore.js

import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { authSlice } from "./authSlice";
import { authApi } from "./authApi ";
import { favoriteApi } from "./favoriteApi";
import { myListApi } from "./myListApi";
import { commentApi } from "./commentApi";

const persistConfig = {
  key: "root",
  storage,
  whitelist: [`authSlice`],
};

const rootReducer = combineReducers({
  authSlice: authSlice.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [favoriteApi.reducerPath]: favoriteApi.reducer,
  [myListApi.reducerPath]: myListApi.reducer,
  [commentApi.reducerPath]: commentApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(authApi.middleware)
      .concat(favoriteApi.middleware)
      .concat(myListApi.middleware)
      .concat(commentApi.middleware),
});
export const persistor = persistStore(store);
