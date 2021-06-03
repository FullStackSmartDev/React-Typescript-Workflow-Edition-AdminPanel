import { createSlice } from "@reduxjs/toolkit";
import {
  getValidationList,
  getValidationListNotes,
  postValidationListNote,
  clearValidationListNotes,
} from "./validationActionCreation";
import {
  actionFulfilled,
  actionRejected,
  actionValidationNotesListFulfilled,
  actionValidationNotesListRejected,
} from "./validationReducers";

interface ValidationNotes {
  validationNotesListData: object;
  isLoading: boolean;
}

// Init State
const validationState: any = {
  validationData: {},
  isLoading: false,
};
const validationNoteState: ValidationNotes = {
  validationNotesListData: {},
  isLoading: false,
};

// Slice
export const validationList = createSlice({
  name: "validation-formulary",
  initialState: validationState,
  reducers: {},
  extraReducers: (builder) => (
    builder.addCase(getValidationList.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(getValidationList.fulfilled, (state, action) => {
      actionFulfilled(state, action);
    }),
    builder.addCase(getValidationList.rejected, (state, action) => {
      actionRejected(state, action);
    })
  ),
});

// Slice
export const validationNotesList = createSlice({
  name: "validation-formulary/notes",
  initialState: validationNoteState,
  reducers: {},
  extraReducers: (builder) => (
    builder.addCase(getValidationListNotes.pending, (state, action) => {
      state.isLoading = true;
    }),
    builder.addCase(getValidationListNotes.fulfilled, (state, action) => {
      actionValidationNotesListFulfilled(state, action);
    }),
    builder.addCase(getValidationListNotes.rejected, (state, action) => {
      actionValidationNotesListRejected(state, action);
    })
    // builder.addCase(postValidationListNote.pending, (state, action) => {
    //   // state.validationNotesListData = action.payload;
    // }),
    // builder.addCase(postValidationListNote.fulfilled, (state, action) => {
    //   // state.validationNotesListData = action.payload;
    // }),
    // builder.addCase(postValidationListNote.rejected, (state, action) => {
    //   // state.validationNotesListData = action.payload;
    // })
  ),
});
