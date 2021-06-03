export const getPNSummaryFulfilled = (state, action) => {
  console.log("Reducer::getPNSummaryFulfilled");
  state.isLoading = false;
  console.log("getPNSummaryFulfilled Action - - - - - - -", action);
  if (
    action.payload.data === undefined ||
    !Array.isArray(action.payload.data) ||
    action.payload.data.length === 0
  ) {
    console.log("getPNSummaryFulfilled: Payload invaLid");
    return;
  }
  const data = action.payload.data[0];
  console.log("THe PN Summary Action = ", action);
  console.log("THe PN Summary Action Payload = ", action.payload);
  // Response stored in the redux store.
  state.data = data;
};

export const getPNSummaryRejected = (state, action) => {
  console.log("Reducer::getPNSummaryRejected");
  state.isLoading = false;
  state.data = {};
};

export const postPNListFulfilled = (state, action) => {
  console.log("Reducer::postPNListFulfilled");
  state.isLoading = false;
  console.log(action);
  if (
    action.payload.result === undefined ||
    !Array.isArray(action.payload.result) ||
    action.payload.result.length === 0
  ) {
    console.log("postPNListFulfilled: Payload invalid");
    return;
  }
  const data = action.payload.result;
  // Response stored in the redux store.
  state.applyData = data;
};

export const postPNListRejected = (state, action) => {
  console.log("Reducer::postPNListRejected");
  state.isLoading = false;
  state.applyData = {};
};

export const postReplaceDrugFulfilled = (state, action) => {
  console.log("Reducer::postReplaceDrugFulfilled");
  state.isLoading = false;
  console.log(action);
  if (action.payload) {
    console.log("postReplaceDrugFulfilled: Payload invalid");
    return;
  }
  const data = action.payload;
  state.data = data;
};

export const postReplaceDrugRejected = (state, action) => {
  console.log("Reducer::postReplaceDrugRejected");
  state.isLoading = false;
  state.data = {};
};
