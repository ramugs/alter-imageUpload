import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseURL } from "../config";

export const getUser = createAsyncThunk(
  "getUser",
  async (userID: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseURL}user/${userID}`);
      return response.data;
    } catch (error: any) {
      if (error?.response?.status === 500) {
        window.location.href = "/error-page";
      }
      return rejectWithValue(error);
    }
  }
);

export const imageUpload = createAsyncThunk(
  "imageUpload",
  async (data: { userID: string; formData: FormData }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `${baseURL}user/${data?.userID}`,
        data?.formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error: any) {
      if (error?.response?.status === 500) {
        window.location.href = "/error-page";
      }
      return rejectWithValue(error);
    }
  }
);

export const selectProfileImage = createAsyncThunk(
  "selectProfileImage",
  async (data: { userID: string; formData: FormData }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `${baseURL}user/profile-image/${data?.userID}`,
        data?.formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error: any) {
      if (error?.response?.status === 500) {
        window.location.href = "/error-page";
      }
      return rejectWithValue(error);
    }
  }
);
