import { createSlice } from "@reduxjs/toolkit";
import {
  getDrugDetailsPGCSummary,
  getDrugDetailsPGCList,
  getExcludedDrugsPGCList,
} from "./pgcActionCreation";
import {
  getPGCSummaryFulfilled,
  getPGCSummaryRejected,
  postPGCListFulfilled,
  postPGCListRejected,
} from "./pgcReducers";

const pgcState: any = {
  data: {},
  isLoading: false,
};

export const pgcSlice = createSlice({
  name: "pgcSummary",
  initialState: pgcState,
  reducers: {},
  extraReducers: (builder) => (
    builder.addCase(getDrugDetailsPGCSummary.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(getDrugDetailsPGCSummary.fulfilled, (state, action) => {
      getPGCSummaryFulfilled(state, action);
    }),
    builder.addCase(getDrugDetailsPGCSummary.rejected, (state, action) => {
      getPGCSummaryRejected(state, action);
    })
  ),
});

export const pgcListSlice = createSlice({
  name: "pgcDrugList",
  initialState: pgcState,
  reducers: {},
  extraReducers: (builder) => (
    builder.addCase(getDrugDetailsPGCList.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(getDrugDetailsPGCList.fulfilled, (state, action) => {
      postPGCListFulfilled(state, action);
    }),
    builder.addCase(getDrugDetailsPGCList.rejected, (state, action) => {
      postPGCListRejected(state, action);
    })
  ),
});

export const pgcListExcludedSlice = createSlice({
  name: "pgcDrugListExcluded",
  initialState: pgcState,
  reducers: {},
  extraReducers: (builder) => (
    builder.addCase(getExcludedDrugsPGCList.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(getExcludedDrugsPGCList.fulfilled, (state, action) => {
      postPGCListFulfilled(state, action);
    }),
    builder.addCase(getExcludedDrugsPGCList.rejected, (state, action) => {
      postPGCListRejected(state, action);
    })
  ),
});
