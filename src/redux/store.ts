import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import {
  getUserReducer,
  imageUploadReducer,
  selectProfileImageReducer,
} from "./user/userSlice";

export const store = configureStore({
  reducer: {
    getUser: getUserReducer,
    imageUpload: imageUploadReducer,
    selectProfileImage: selectProfileImageReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
