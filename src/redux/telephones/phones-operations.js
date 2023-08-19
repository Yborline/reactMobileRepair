import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'https://mobilerepair.onrender.com/api/';

const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = '';
  },
};

export const fetchTelephones = createAsyncThunk(
  'fetchPhones/phones',
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const persistedToken = state.auth.token;
      token.set(persistedToken);
      const { data } = await axios.get('/action');
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const addTelephones = createAsyncThunk(
  'addPhone/phones',
  async (result, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const persistedToken = state.auth.token;
      token.set(persistedToken);
      const { data } = await axios.post('/action', result);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const changeStatus = createAsyncThunk(
  'changeStatus/phones',
  async ({ id, status, finishDay, sellPrice, statusRepair }, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const persistedToken = state.auth.token;
      token.set(persistedToken);
      const date = new Date();
      const newDate = `${date.toLocaleDateString(
        'uk-UA',
      )} ${date.toLocaleTimeString()}`;
      const { data } = await axios.patch(`/action/status/${id}`, {
        status: status,
        finishDay: finishDay ? finishDay : newDate,
        sellPrice,
        statusRepair,
      });
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const changeStatusStart = createAsyncThunk(
  'changeStatusRepair/phones',
  async ({ id, statusRepair, sellPrice, status }, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const persistedToken = state.auth.token;
      token.set(persistedToken);
      const date = new Date();
      console.log(date.__proto__);
      const newDate = `${date.toLocaleDateString(
        'uk-UA',
      )} ${date.toLocaleTimeString()}`;
      const { data } = await axios.patch(`/action/statusRepair/${id}`, {
        finishDay: newDate,
        statusRepair,
        sellPrice,
      });
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const changeTime = createAsyncThunk(
  'changeTime/phones',
  async ({ id, result }, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const persistedToken = state.auth.token;
      token.set(persistedToken);
      const { data } = await axios.patch(`/action/time/${id}`, result);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const changePrice = createAsyncThunk(
  'changeOther/phones',
  async ({ id, other, key }, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const persistedToken = state.auth.token;
      token.set(persistedToken);
      const { data } = await axios.patch(`/action/price/${id}`, {
        [key]: other,
      });
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);
