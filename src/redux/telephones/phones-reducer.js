import {
  fetchTelephones,
  addTelephones,
  changeStatus,
  changeTime,
  changeStatusStart,
  changePrice,
} from "./phones-operations";
import { combineReducers } from "redux";
import { createReducer, createSlice } from "@reduxjs/toolkit";
function isPendingAction(action) {
  return action.type.endsWith("/pending");
}

const initialState = {
  items: {
    diagnosis: [],
    repair: [],
    purchase: [],
  },
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
        return {
          ...state,
          items: action.payload.phones,
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
          // [payload.repair.status]: [payload.repair, ...state?.items?.diagnosis],
          //  state.items.[payload.repair.status].push(payload.repair),
        },

        loading: false,
        error: null,
      };
    });
    builder.addCase(changeStatus.fulfilled, (state, { payload }) => {
      return {
        ...state,

        items: {
          // ...state.items,

          // [payload.result.status]: [
          //   payload.result,
          //   ...state.items.diagnosis.filter(
          //     (item) => item._id !== payload.result._id
          //   ),
          // ],

          diagnosis: [
            payload.result.status === "diagnosis" && payload.result,
            ...state.items.diagnosis.filter(
              (item) => item._id !== payload.result._id
            ),
          ],
          repair: [
            payload.result.status === "repair" && payload.result,
            ...state.items.repair.filter(
              (item) => item._id !== payload.result._id
            ),
          ],
          purchase: [
            payload.result.status === "purchase" && payload.result,
            ...state.items.purchase.filter(
              (item) => item._id !== payload.result._id
            ),
          ],
        },

        // diagnosis: state.items.diagnosis.map((item) =>
        //   item._id === payload.result._id ? payload.result : item
        // ),
        // repair: state.items.repair.map((item) =>
        //   item._id === payload.result._id ? payload.result : item
        // ),
        // purchase: state.items.purchase.map((item) =>
        //   item._id === payload.result._id ? payload.result : item
        // ),

        loading: false,
        error: null,
      };
    });
    builder.addCase(changeTime.fulfilled, (state, { payload }) => {
      return {
        ...state,
        items: {
          ...state.items,
          [payload.result.status]: state.items[payload.result.status].map(
            (item) => (item._id === payload.result._id ? payload.result : item)
          ),

          // diagnosis: state.items.diagnosis.map((item) =>
          //   item._id === payload.result._id ? payload.result : item
          // ),
          // repair: state.items.repair.map((item) =>
          //   item._id === payload.result._id ? payload.result : item
          // ),
          // purchase: state.items.purchase.map((item) =>
          //   item._id === payload.result._id ? payload.result : item
          // ),
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
            (item) => (item._id === payload.result._id ? payload.result : item)
          ),
        },

        loading: false,
        error: null,
      };
    });

    builder
      .addCase(changeStatusStart.fulfilled, (state, { payload }) => {
        return {
          // ...state,
          items: {
            // ...state.items,
            [payload.result.status]: state.items[payload.result.status].map(
              (item) =>
                item._id === payload.result._id ? payload.result : item
            ),
          },
          loading: false,
          error: null,
        };
      })
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state, action) => {
          return {
            ...state,
            loading: true,
          };
        }
      )
      .addMatcher(
        // matcher can be defined inline as a type predicate function
        (action) => action.type.endsWith("/rejected"),
        (state, { payload }) => {
          return {
            ...state,
            loading: false,
            error: payload.message,
          };
        }
      );
    // matcher can just return boolean and the matcher can receive a generic argument
    // .addMatcher(
    //   (action) => action.type.endsWith("/fulfilled"),
    //   (state, action) => {
    //     state.status = "fulfilled";
    //   }
    // );
    ///

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
