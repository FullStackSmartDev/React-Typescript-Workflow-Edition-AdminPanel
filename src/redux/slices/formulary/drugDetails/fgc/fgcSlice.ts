import { createSlice } from "@reduxjs/toolkit";
import { getDrugDetailsFGCTiers } from "./fgcActionCreation";
import { getFGCFulfilled, getFGCRejected } from "./fgcReducers";

const fgcState: any = {
  data: {},
  isLoading: false,
};

export const fgcSlice = createSlice({
  name: "fgcData",
  initialState: fgcState,
  reducers: {},
  extraReducers: (builder) => (
    builder.addCase(getDrugDetailsFGCTiers.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(getDrugDetailsFGCTiers.fulfilled, (state, action) => {
      getFGCFulfilled(state, action);
    }),
    builder.addCase(getDrugDetailsFGCTiers.rejected, (state, action) => {
      getFGCRejected(state, action);
    })
  ),
});
