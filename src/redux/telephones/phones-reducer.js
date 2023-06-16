import { fetchTelephones, addTelephones } from "./phones-operations";
import { combineReducers } from "redux";
import { createReducer, createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  error: null,
  loading: false,
};

const phonesSlice = createSlice({
  name: "phones",
  initialState,
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
  },
  extraReducers: (builder) => {
    builder
      // Add reducers for additional action types here, and handle loading state as needed
      .addCase(fetchTelephones.fulfilled, (state, action) => {
        state.items = action.payload.phones;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchTelephones.pending, (state, action) => {
        console.log(action.type);
        state.items = [];
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTelephones.rejected, (state, action) => {
        state.items = [];
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(addTelephones.fulfilled, (state, action) => {
        state.items.push(action.payload.repair);
        state.loading = false;
        state.error = null;
      })
      .addCase(addTelephones.pending, (state, action) => {
        console.log(action.type);
        state.items = [];
        state.loading = true;
        state.error = null;
      })
      .addCase(addTelephones.rejected, (state, action) => {
        state.items = [];
        state.loading = false;
        state.error = action.payload.message;
      });

    // [fetchTelephones.pending]: (state, action) => {
    //   state.phones = [];
    //   state.loading = true;
    //   state.error = null;
    // },
    // [fetchTelephones.rejected](state, action) {
    //   state.phones = [];
    //   state.loading = false;
    //   state.error = action.payload.message;
    // },
  },
});

export default phonesSlice.reducer;
