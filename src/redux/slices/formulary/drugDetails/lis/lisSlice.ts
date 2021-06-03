import { createSlice } from "@reduxjs/toolkit";
import {
  getDrugDetailsLISSummary,
  getDrugDetailsLISList,
} from "./lisActionCreation";
import {
  getLISSummaryFulfilled,
  getLISSummaryRejected,
  postLISListFulfilled,
  postLISListRejected,
} from "./lisReducers";

const lisState: any = {
  data: {},
  isLoading: false,
};

export const lisSlice = createSlice({
  name: "lisSummary",
  initialState: lisState,
  reducers: {},
  extraReducers: (builder) => (
    builder.addCase(getDrugDetailsLISSummary.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(getDrugDetailsLISSummary.fulfilled, (state, action) => {
      getLISSummaryFulfilled(state, action);
    }),
    builder.addCase(getDrugDetailsLISSummary.rejected, (state, action) => {
      getLISSummaryRejected(state, action);
    })
  ),
});

export const lisListSlice = createSlice({
  name: "lisDrugList",
  initialState: lisState,
  reducers: {},
  extraReducers: (builder) => (
    builder.addCase(getDrugDetailsLISList.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(getDrugDetailsLISList.fulfilled, (state, action) => {
      postLISListFulfilled(state, action);
    }),
    builder.addCase(getDrugDetailsLISList.rejected, (state, action) => {
      postLISListRejected(state, action);
    })
  ),
});
