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
  filter: "",
  filterDate: "",
  error: null,
  loading: false,
};

export const phonesSlice = createSlice({
  name: "phones",
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
    // standard reducer logic, with auto-generated action types per reducer
  },
  extraReducers: (builder) => {
    builder
      // Add reducers for additional action types here, and handle loading state as needed
      .addCase(fetchTelephones.fulfilled, (state, { payload }) => {
        return {
          ...state,
          items: payload.phones,
          loading: false,
          error: null,
        };
      });
    //     .addCase(changeFilter, (state, { payload }) => {
    //   return { ...state, filter: payload };
    // });
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
      console.log(state.phones);
      return {
        ...state,

        items: {
          ...state.items,
          [payload.oldStatus]: state.items[payload.oldStatus].filter(
            (item) => item._id !== payload.result._id
          ),

          [payload.result.status]: [
            payload.result,
            state.items[payload.result.status],
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
          ...state,
          items: {
            ...state.items,
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
        (action) => action.type.endsWith("phones/pending"),
        (state, action) => {
          return {
            ...state,
            loading: true,
          };
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("phones/fulfilled"),
        (state, action) => {
          return {
            ...state,
            loading: false,
            error: null,
          };
        }
      )
      .addMatcher(
        // matcher can be defined inline as a type predicate function
        (action) => action.type.endsWith("phones/rejected"),
        (state, { payload }) => {
          return {
            ...state,
            loading: false,
            error: payload,
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

// return {
//   ...state,

//   items: {
//     // ...state.items,

//     // [payload.result.status]: [
//     //   payload.result,
//     //   ...state.items.diagnosis.filter(
//     //     (item) => item._id !== payload.result._id
//     //   ),
//     // ],

//     diagnosis: [
//       ...state.items.diagnosis?.filter(
//         (item) => item._id !== payload.result._id
//       ),
//       // payload.result.status === "diagnosis" &&
//       //   payload.result.status.push(payload.result),
//     ],
//     repair: [
//       ...state.items.repair?.filter(
//         (item) => item._id !== payload.result._id
//       ),
//       // payload.result.status === "repair" &&
//       //   payload.result.status.push(payload.result),
//     ],
//     purchase: [
//       ...state.items.purchase?.filter(
//         (item) => item._id !== payload.result._id
//       ),
//       // payload.result.status === "purchase" &&
//       //   payload.result.status.push(payload.result),
//     ],
//              state.items[payload.result.status].push(payload.result),
//   },

//   // diagnosis: state.items.diagnosis.map((item) =>
//   //   item._id === payload.result._id ? payload.result : item
//   // ),
//   // repair: state.items.repair.map((item) =>
//   //   item._id === payload.result._id ? payload.result : item
//   // ),
//   // purchase: state.items.purchase.map((item) =>
//   //   item._id === payload.result._id ? payload.result : item
//   // ),

//   loading: false,
//   error: null,
// };
