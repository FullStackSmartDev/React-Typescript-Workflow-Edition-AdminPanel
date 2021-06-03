import { createSlice } from "@reduxjs/toolkit";
import { getDrugDetailsVBIDSummary } from "./vbidActionCreation";
import {
  getVBIDSummaryFulfilled,
  getVBIDSummaryRejected,
} from "./vbidReducers";

const vbidState: any = {
  data: {},
  isLoading: false,
};

export const vbidSlice = createSlice({
  name: "vbidSummary",
  initialState: vbidState,
  reducers: {},
  extraReducers: (builder) => (
    builder.addCase(getDrugDetailsVBIDSummary.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(getDrugDetailsVBIDSummary.fulfilled, (state, action) => {
      getVBIDSummaryFulfilled(state, action);
    }),
    builder.addCase(getDrugDetailsVBIDSummary.rejected, (state, action) => {
      getVBIDSummaryRejected(state, action);
    })
  ),
});
