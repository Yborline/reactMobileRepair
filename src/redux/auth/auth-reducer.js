import { createSlice } from '@reduxjs/toolkit';
import authOperations, { loginG } from './auth-operatins';

const initialState = {
  user: { name: null, email: null, type: null },
  token: null,
  isLoggedIn: false,
  isFetchingCurrentUser: false,
  userLoading: false,
  userError: null,
};

export const userSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginG(state, { payload }) {
      return {
        ...state,
        isLoggedIn: true,
        token: payload.token,
        user: payload.user,
      };
    },
  },
  extraReducers: builder => {
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

            isLoggedIn: true,

            isFetchingCurrentUser: false,
          };
        },
      )
      .addCase(
        authOperations.fetchCurrentUser.pending,
        (state, { payload }) => {
          return {
            ...state,
            user: { ...payload?.user },

            isFetchingCurrentUser: true,
          };
        },
      )
      .addCase(
        authOperations.fetchCurrentUser.rejected,
        (state, { payload }) => {
          return {
            ...state,
            user: { ...payload?.user },

            isLoggedIn: false,

            isFetchingCurrentUser: false,
          };
        },
      )

      .addMatcher(
        action => action.type.endsWith('/auth/fulfilled'),
        (state, action) => {
          return {
            ...state,
            userLoading: false,
            userError: null,
          };
        },
      )
      .addMatcher(
        action => action.type.endsWith('/auth/pending'),
        (state, action) => {
          return {
            ...state,
            userLoading: true,
          };
        },
      )
      .addMatcher(
        action => action.type.endsWith('/auth/rejected'),
        (state, { payload }) => {
          return {
            ...state,
            userLoading: false,
            userError: payload,
          };
        },
      );
  },
});
export default userSlice.reducer;
