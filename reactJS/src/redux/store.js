import { configureStore, createSlice } from "@reduxjs/toolkit";
import { cartReducer } from "./cartSlide";
import { layoutReducer } from "./layoutSlide";
import { credentialsReducer } from "./credentials";
import { combineReducers } from "redux";

import storage from "redux-persist/lib/storage";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};
const rootReducer = combineReducers({
  cart: cartReducer,
  credentials: credentialsReducer,
  layoutState:layoutReducer,

});


const persistedReducer = persistReducer(persistConfig,rootReducer);

export const store = configureStore({
  // reducer: cartReducer,
  reducer:persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

// export default store;
