import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../config";
import axios from "axios";

export const getUser = createAsyncThunk(
  "getUser",
  async (userID: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://alter-backend-1.onrender.com/api/v1/user/${userID}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const imageUpload = createAsyncThunk(
  "imageUpload",
  async (data: { userID: string; formData: FormData }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `https://alter-backend-1.onrender.com/api/v1/user/${data?.userID}`,
        data?.formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
