import { createReducer, createSlice } from "@reduxjs/toolkit";
import authOperations from "./auth-operatins";
import { combineReducers } from "redux";

const initialState = {
  user: { name: null, email: null, type: null },
  token: null,
  isLoggedIn: false,
  isFetchingCurrentUser: false,
  userLoading: false,
  userError: null,
};

const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(authOperations.register.fulfilled, (state, { payload }) => {
        return {
          ...state,
          user: payload.user,
        };
      })
      .addCase(authOperations.login.fulfilled, (state, { payload }) => {
        return {
          ...state,
          isLoggedIn: true,
          token: payload.token,
          user: { ...payload.user },
        };
      })
      .addCase(authOperations.logout.fulfilled, (state, action) => {
        return {
          ...state,
          user: { name: null, email: null, type: null },
          token: null,
          isLoggedIn: false,
        };
      })
      .addCase(
        authOperations.fetchCurrentUser.fulfilled,
        (state, { payload }) => {
          return {
            ...state,
            user: { ...payload?.user },
            // isLoggedIn: payload ? true : false,
            isLoggedIn: true,
            //
            isFetchingCurrentUser: false,
          };
        }
      )
      .addCase(
        authOperations.fetchCurrentUser.pending,
        (state, { payload }) => {
          return {
            ...state,
            user: { ...payload?.user },
            // isLoggedIn: payload ? true : false,

            //
            isFetchingCurrentUser: true,
          };
        }
      )
      .addCase(
        authOperations.fetchCurrentUser.rejected,
        (state, { payload }) => {
          return {
            ...state,
            user: { ...payload?.user },
            // isLoggedIn: payload ? true : false,
            isLoggedIn: false,
            //
            isFetchingCurrentUser: false,
          };
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/auth/fulfilled"),
        (state, action) => {
          return {
            ...state,
            userLoading: false,
            userError: null,
          };
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/auth/pending"),
        (state, action) => {
          return {
            ...state,
            userLoading: true,
          };
        }
      )
      .addMatcher(
        // matcher can be defined inline as a type predicate function
        (action) => action.type.endsWith("/auth/rejected"),
        (state, { payload }) => {
          return {
            ...state,
            userLoading: false,
            userError: payload,
          };
        }
      );
  },
});
export default userSlice.reducer;
