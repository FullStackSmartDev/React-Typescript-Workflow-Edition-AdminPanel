export const actionFulfilled = (state, action) => {
  state.isLoading = false;
  if (
    action.payload.result === undefined ||
    !Array.isArray(action.payload.result.validations) ||
    action.payload.result.validations.length === 0
  ) {
    return;
  }
  state.validationData = action.payload.result;
};

export const actionRejected = (state, action) => {
  state.isLoading = false;
  state.validationData = {};
};

export const actionValidationNotesListFulfilled = (state, action) => {
  state.isLoading = false;

  console.log("ACTION OBJECT: ", action);
  if (action.payload.data.message !== "ok") {
    return;
  }
  const notesList = {
    validation_id: action.payload.validation_id,
    notes: action.payload.data.result,
  };
  state.validationNotesListData = notesList;
};

export const actionValidationNotesListRejected = (state, action) => {
  state.isLoading = false;
  state.validationNotesListData = {};
};
