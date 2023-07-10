import axios from "axios";
import { createAsyncThunk, createAction } from "@reduxjs/toolkit";

axios.defaults.baseURL = "https://mobilerepair.onrender.com/api/";

const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = ``;
  },
};

export const register = createAsyncThunk(
  "signup/auth",
  async (credentials, thunkAPI) => {
    try {
      const { data } = await axios.post("/auth/signup", credentials);

      // console.log(data);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const login = createAsyncThunk("login/auth", async (credentials, thunkAPI) => {
  try {
    const { data } = await axios.post("auth/login", credentials);
    token.set(data.token);
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

const logout = createAsyncThunk("logout/auth", async (_, thunkAPI) => {
  try {
    await axios.get("/auth/logout");
    token.unset();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

const fetchCurrentUser = createAsyncThunk(
  "refresh/auth",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();

    const persistedToken = state.auth.token;

    if (persistedToken === null) {
      return thunkAPI.rejectWithValue("Користувача не знайдено");
    }
    token.set(persistedToken);
    try {
      const { data } = await axios.get("/auth/current");

      return data;
    } catch (error) {
      window.localStorage.removeItem("persist:auth");
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const authOperations = {
  fetchCurrentUser,
  logout,
  login,
  register,
};

export default authOperations;
