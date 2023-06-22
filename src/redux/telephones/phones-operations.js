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

export const changeStatus = createAsyncThunk(
  "phones/changeStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const { data } = await axios.patch(`/action/status/${id}`, {
        status: status,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const changeStatusStart = createAsyncThunk(
  "phones/changeStatusRepair",
  async ({ id, statusRepair }, { rejectWithValue }) => {
    try {
      const { data } = await axios.patch(`/action/statusRepair/${id}`, {
        statusRepair: statusRepair,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const changeTime = createAsyncThunk(
  "phones/changeTime",
  async ({ id, result }, { rejectWithValue }) => {
    try {
      console.log(result);
      const { data } = await axios.patch(`/action/time/${id}`, result);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
