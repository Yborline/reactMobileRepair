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

export const fetchStorage = createAsyncThunk(
  'fetchStorage/storage',
  async (_, thunkApi) => {
    try {
      const state = thunkApi.getState();
      const persistedToken = state.auth.token;
      token.set(persistedToken);
      const { data } = await axios.get('/storage');
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);

export const addSparePartsStorage = createAsyncThunk(
  'addSpareParts/storage',
  async (value, thunkApi) => {
    try {
      const state = thunkApi.getState();
      const persistedToken = state.auth.token;
      token.set(persistedToken);
      const { data } = await axios.post('/storage', value);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);

export const updateSparePartsStorage = createAsyncThunk(
  'updateSpareParts/storage',
  async ({ id, value }, thunkApi) => {
    try {
      const state = thunkApi.getState();
      const persistedToken = state.auth.token;
      token.set(persistedToken);
      const { data } = await axios.patch(`/storage/${id}`, value);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);
