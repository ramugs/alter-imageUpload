import { createSlice } from "@reduxjs/toolkit";
import { getUser, imageUpload, selectProfileImage } from "./userReducer";

const getUserSlice = createSlice({
  name: "getUser",
  initialState: {
    status: "",
    isLoading: false,
    data: {},
    error: {},
  },
  reducers: {
    resetGetUserState: () => ({
      status: "",
      isLoading: false,
      data: {},
      error: {},
    }),
  },
  extraReducers: (builder) => {
    builder.addCase(getUser.pending, (state) => {
      state.status = "pending";
      state.isLoading = true;
    });
    builder.addCase(getUser.fulfilled, (state, { payload }) => {
      state.status = "success";
      state.data = payload;
      state.isLoading = false;
    });
    builder.addCase(getUser.rejected, (state, { payload }: any) => {
      state.status = "success";
      state.error = payload.response;
      state.isLoading = false;
    });
  },
});

export const getUserReducer = getUserSlice.reducer;
export const { resetGetUserState } = getUserSlice.actions;

const imageUploadSlice = createSlice({
  name: "getUser",
  initialState: {
    status: "",
    isLoading: false,
    data: {},
    error: {},
  },
  reducers: {
    resetImageUploadState: () => ({
      status: "",
      isLoading: false,
      data: {},
      error: {},
    }),
  },
  extraReducers: (builder) => {
    builder.addCase(imageUpload.pending, (state) => {
      state.status = "pending";
      state.isLoading = true;
    });
    builder.addCase(imageUpload.fulfilled, (state, { payload }) => {
      state.status = "success";
      state.data = payload;
      state.isLoading = false;
    });
    builder.addCase(imageUpload.rejected, (state, { payload }: any) => {
      state.status = "success";
      state.error = payload.response;
      state.isLoading = false;
    });
  },
});

export const imageUploadReducer = imageUploadSlice.reducer;
export const { resetImageUploadState } = imageUploadSlice.actions;



const selectProfileImageSlice = createSlice({
  name: "selectProfileImage",
  initialState: {
    status: "",
    isLoading: false,
    data: {},
    error: {},
  },
  reducers: {
    resetSelectProfileImageState: () => ({
      status: "",
      isLoading: false,
      data: {},
      error: {},
    }),
  },
  extraReducers: (builder) => {
    builder.addCase(selectProfileImage.pending, (state) => {
      state.status = "pending";
      state.isLoading = true;
    });
    builder.addCase(selectProfileImage.fulfilled, (state, { payload }) => {
      state.status = "success";
      state.data = payload;
      state.isLoading = false;
    });
    builder.addCase(selectProfileImage.rejected, (state, { payload }: any) => {
      state.status = "success";
      state.error = payload.response;
      state.isLoading = false;
    });
  },
});

export const selectProfileImageReducer = selectProfileImageSlice.reducer;
export const { resetSelectProfileImageState } = selectProfileImageSlice.actions;