import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = "https://mobilerepair.onrender.com/api/";

export const fetchTelephones = createAsyncThunk(
  "phones/fetchPhones",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/action");
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const addTelephones = createAsyncThunk(
  "phones/addPhone",
  async (result, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/action", result);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
