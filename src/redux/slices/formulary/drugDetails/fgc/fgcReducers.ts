export const getFGCFulfilled = (state, action) => {
  console.log("Reducer::getFGCFulfilled");
  state.isLoading = false;
  console.log("getFGCFulfilled Action - - - - - - -", action);
  if (
    action.payload.data === undefined ||
    !Array.isArray(action.payload.data) ||
    action.payload.data.length === 0
  ) {
    console.log("getFGCFulfilled: Payload invalid");
    return;
  }
  const data = action.payload.data[0];
  console.log("THe FGC Action = ", action);
  console.log("THe FGC Action Payload = ", action.payload);
  // Response stored in the redux store.
  state.data = data;
};

export const getFGCRejected = (state, action) => {
  console.log("Reducer::getFGCRejected");
  state.isLoading = false;
  state.data = {};
};
