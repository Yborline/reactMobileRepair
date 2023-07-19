import {
  fetchTelephones,
  addTelephones,
  changeStatus,
  changeTime,
  changeStatusStart,
  changePrice,
} from './phones-operations';

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: {
    diagnosis: [],
    repair: [],
    purchase: [],
  },
  filter: '',
  filterDate: '',
  error: null,
  loading: false,
};

export const phonesSlice = createSlice({
  name: 'phones',
  initialState,
  reducers: {
    changeFilter(state, { payload }) {
      return {
        ...state,
        filter: payload,
      };
    },
    changeFilterDate(state, { payload }) {
      return {
        ...state,
        filterDate: payload,
      };
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchTelephones.fulfilled, (state, { payload }) => {
      return {
        ...state,
        items: payload.phones,
        loading: false,
        error: null,
      };
    });

    builder.addCase(addTelephones.fulfilled, (state, { payload }) => {
      return {
        ...state,
        items: {
          ...state.items,
          [payload.repair.status]: [
            payload.repair,
            ...state?.items?.[payload.repair.status],
          ],
        },

        loading: false,
        error: null,
      };
    });
    builder.addCase(changeStatus.fulfilled, (state, { payload }) => {
      return {
        ...state,

        items: {
          ...state.items,
          [payload.oldStatus]: state.items[payload.oldStatus].filter(
            item => item._id !== payload.result._id,
          ),

          [payload.result.status]: [
            payload.result,
            ...state.items[payload.result.status],
          ],
          loading: false,
          error: null,
        },
      };
    });
    builder.addCase(changeTime.fulfilled, (state, { payload }) => {
      return {
        ...state,
        items: {
          ...state.items,
          [payload.result.status]: state.items[payload.result.status].map(
            item => (item._id === payload.result._id ? payload.result : item),
          ),
        },

        loading: false,
        error: null,
      };
    });
    builder.addCase(changePrice.fulfilled, (state, { payload }) => {
      return {
        ...state,
        items: {
          ...state.items,
          [payload.result.status]: state.items[payload.result.status].map(
            item => (item._id === payload.result._id ? payload.result : item),
          ),
        },

        loading: false,
        error: null,
      };
    });

    builder
      .addCase(changeStatusStart.fulfilled, (state, { payload }) => {
        return {
          ...state,
          items: {
            ...state.items,
            [payload.result.status]: state.items[payload.result.status].map(
              item => (item._id === payload.result._id ? payload.result : item),
            ),
          },
          loading: false,
          error: null,
        };
      })
      .addMatcher(
        action => action.type.endsWith('phones/pending'),
        (state, action) => {
          return {
            ...state,
            loading: true,
          };
        },
      )
      .addMatcher(
        action => action.type.endsWith('phones/fulfilled'),
        (state, action) => {
          return {
            ...state,
            loading: false,
            error: null,
          };
        },
      )
      .addMatcher(
        action => action.type.endsWith('phones/rejected'),
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

export default phonesSlice.reducer;
