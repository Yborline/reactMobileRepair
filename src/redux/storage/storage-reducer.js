import {
  fetchStorage,
  addSparePartsStorage,
  updateSparePartsStorage,
} from './storage-operations';

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  spareParts: [],
  error: null,
  loading: false,
};

export const storageSlice = createSlice({
  name: 'spareParts',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchStorage.fulfilled, (state, { payload }) => {
        return {
          ...state,
          spareParts: payload.storage,
          loading: false,
          error: null,
        };
      })
      .addCase(addSparePartsStorage.fulfilled, (state, { payload }) => {
        return {
          ...state,
          spareParts: [...state.spareParts, payload.onePhone],
          loading: false,
          error: null,
        };
      })
      .addCase(updateSparePartsStorage.fulfilled, (state, { payload }) => {
        return {
          ...state,
          spareParts: [
            ...state.spareParts.filter(
              item => item._id !== payload.updatePhone._id,
            ),
            payload.updatePhone,
          ],
        };
      });
    builder
      .addMatcher(
        action => action.type.endsWith('storage/pending'),
        (state, action) => {
          return {
            ...state,
            loading: true,
          };
        },
      )
      .addMatcher(
        action => action.type.endsWith('storage/rejected'),
        (state, { payload }) => {
          return {
            ...state,
            loading: false,
            error: payload,
          };
        },
      );
  },
});

export default storageSlice.reducer;
