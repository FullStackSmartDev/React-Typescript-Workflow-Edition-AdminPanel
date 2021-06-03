import { createSlice } from "@reduxjs/toolkit";
import { getDrugDetailsSSMSummary, getDrugDetailsSSMList } from "./ssmActionCreation";
import { getSSMSummaryFulfilled, getSSMSummaryRejected, postSSMListFulfilled, postSSMListRejected } from "./ssmReducers";

const ssmState: any = {
  data: {},
  isLoading: false,
};

export const ssmSlice = createSlice({
  name: "ssmSummary",
  initialState: ssmState,
  reducers: {},
  extraReducers: (builder) => (
    builder.addCase(getDrugDetailsSSMSummary.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(getDrugDetailsSSMSummary.fulfilled, (state, action) => {
      getSSMSummaryFulfilled(state, action);
    }),
    builder.addCase(getDrugDetailsSSMSummary.rejected, (state, action) => {
      getSSMSummaryRejected(state, action);
    })
  ),
});

export const ssmListSlice = createSlice({
  name: "ssmDrugList",
  initialState: ssmState,
  reducers: {},
  extraReducers: (builder) => (
    builder.addCase(getDrugDetailsSSMList.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(getDrugDetailsSSMList.fulfilled, (state, action) => {
      postSSMListFulfilled(state, action);
    }),
    builder.addCase(getDrugDetailsSSMList.rejected, (state, action) => {
      postSSMListRejected(state, action);
    })
  ),
});
