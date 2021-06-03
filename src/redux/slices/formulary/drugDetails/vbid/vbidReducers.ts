export const getVBIDSummaryFulfilled = (state, action) => {
  console.log("Reducer::getVBIDSummaryFulfilled");
  state.isLoading = false;
  console.log("getVBIDSummaryFulfilled Action - - - - - - -", action);
  if (
    action.payload.data === undefined ||
    !Array.isArray(action.payload.data) ||
    action.payload.data.length === 0
  ) {
    console.log("getVBIDSummaryFulfilled: Payload invalid");
    return;
  }
  const data = action.payload.data[0];
  console.log("THe VBID Summary Action = ", action);
  console.log("THe VBID Summary Action Payload = ", action.payload);
  // Response stored in the redux store.
  state.data = data;
};

export const getVBIDSummaryRejected = (state, action) => {
  console.log("Reducer::getVBIDSummaryRejected");
  state.isLoading = false;
  state.data = {};
};
