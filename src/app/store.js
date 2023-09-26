import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@app/features/authSlice";
import { podcastApi } from "@app/features/podcastApi";
const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(podcastApi.middleware),
});

export default store;
