import { createSlice } from "@reduxjs/toolkit";
import {
  getDrugDetailsCBSummary,
  getExcludedDrugsCBList,
} from "./cbActionCreation";
import {
  getCBSummaryFulfilled,
  getCBSummaryRejected,
  postCBListFulfilled,
  postCBListRejected,
} from "./cbReducers";

const cbState: any = {
  data: {},
  isLoading: false,
};

export const cbSlice = createSlice({
  name: "cbSummary",
  initialState: cbState,
  reducers: {},
  extraReducers: (builder) => (
    builder.addCase(getDrugDetailsCBSummary.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(getDrugDetailsCBSummary.fulfilled, (state, action) => {
      getCBSummaryFulfilled(state, action);
    }),
    builder.addCase(getDrugDetailsCBSummary.rejected, (state, action) => {
      getCBSummaryRejected(state, action);
    })
  ),
});

export const cbListExcludedSlice = createSlice({
  name: "cbDrugListExcluded",
  initialState: cbState,
  reducers: {},
  extraReducers: (builder) => (
    builder.addCase(getExcludedDrugsCBList.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(getExcludedDrugsCBList.fulfilled, (state, action) => {
      postCBListFulfilled(state, action);
    }),
    builder.addCase(getExcludedDrugsCBList.rejected, (state, action) => {
      postCBListRejected(state, action);
    })
  ),
});
