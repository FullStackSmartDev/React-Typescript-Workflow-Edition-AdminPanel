import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Formulary } from "./formulary";
import {
  getformulary,
  checkNameExist,
  composePostBody,
  createORUpdateFormulary,
  createFormularyUsingClone,
  composeCreateUsingClone,
  createCreateVersion,
  archiveFormularies,
} from "./setupService";
import {
  setFullFormulary,
  setLocationHome,
} from "./../application/applicationSlice";
import { postMessage } from "./../messaging/messagingSlice";

import { stat } from "fs";
import { dispatch } from "d3";

interface SetupState {
  formulary: Formulary | any;
  mode: string;
  nameExist: boolean;
  message: string;
  messageType: string;
  isLoading: boolean;
  error: string | null;
}

const setupInitialState: SetupState = {
  formulary: null,
  mode: "",
  nameExist: false,
  message: "",
  messageType: "",
  isLoading: false,
  error: null,
};

export interface SetupResult {
  formulary: Formulary | any;
}

function startLoading(state: SetupState) {
  state.isLoading = true;
  state.message = "";
  state.messageType = "";
}

function loadingFailed(state: SetupState, action: PayloadAction<string>) {
  state.isLoading = false;
  state.message = action.payload;
  state.messageType = "error";
  state.error = action.payload;
}

const setup = createSlice({
  name: "setup",
  initialState: setupInitialState,
  reducers: {
    getformularyStart: startLoading,
    getFormularySuccess(state, { payload }: PayloadAction<Formulary>) {
      // console.log("***** getFormulariesSuccess ");
      state.formulary = payload;
      state.mode = "EXISTING";
      // state.message ="";
      // state.messageType ="";
      state.isLoading = false;
      state.error = null;
    },
    getFormalaryFailure: loadingFailed,
    setNewFormularySuccess(state) {
      // console.log("***** setNewFormularySuccess ");
      state.formulary = null;
      state.mode = "NEW";
      state.message = "";
      state.messageType = "";
      state.nameExist = false;
      state.isLoading = false;
      state.error = null;
    },
    verifyFormularyNameStart: startLoading,
    verifyFormularyNameSuccess(state, { payload }: PayloadAction<boolean>) {
      //console.log("***** verifyFormularyNameSuccess : ",payload);
      state.nameExist = payload;
      if (payload) {
        state.message = "Formulary name already exist";
        state.messageType = "error";
      } else {
        state.message = "";
        state.messageType = "";
      }
      state.isLoading = false;
      state.error = null;
    },
    verifyFormularyNameFailure: loadingFailed,
    saveFormularyStart: startLoading,
    saveFormularySuccess(state, { payload }: PayloadAction<any>) {
      // console.log("***** saveFormularySuccess : ", payload);
      if (payload) {
        if (payload.status === 200) {
          // state.message = "Formulary created successfully";
          // state.messageType = "success";
          // state.isLoading = false;
          // state.error = null;
        } else if (payload.status === 400) {
          state.message = payload?.data?.message;
          state.messageType = "error";
          state.isLoading = false;
          state.error = payload?.data?.message;
        }
      }
    },
    saveFormularyFailure: loadingFailed,
    createCloneFormularyStart: startLoading,
    createCloneFormularySuccess(state, { payload }: PayloadAction<any>) {
      // console.log("***** createCloneFormularySuccess : ", payload);
      // if (payload) {
      //   if (payload.status === 200) {
      //     // state.message = "Formulary created successfully";
      //     // state.messageType = "success";
      //     // state.isLoading = false;
      //     // state.error = null;
      //   } else if (payload.status === 400) {
      //     state.message = payload?.data?.message;
      //     state.messageType = "error";
      //     state.isLoading = false;
      //     state.error = payload?.data?.message;
      //   }
      // }
    },
    createCloneFormularyFailure: loadingFailed,
    createNewVersionStart: startLoading,
    createNewVersionSuccess(state, { payload }: PayloadAction<any>) {
      if (payload) {
        if (payload.status === 200) {
          state.message = "New Version created successfully";
          state.messageType = "success";
          state.isLoading = false;
          state.error = null;
        } else if (payload.status === 400) {
          state.message = payload?.data?.message;
          state.messageType = "error";
          state.isLoading = false;
          state.error = payload?.data?.message;
        }
      }
    },
    createNewVersionFailure: loadingFailed,
    archiveFormulariesStart: startLoading,
    archiveFormulariesSuccess(state, { payload }: PayloadAction<any>) {
      if (payload) {
        if (payload.status === 200) {
          state.message = "Formulary(s) Archived";
          state.messageType = "success";
          state.isLoading = false;
          state.error = null;
        } else if (payload.status === 400) {
          state.message = payload?.data?.message;
          state.messageType = "error";
          state.isLoading = false;
          state.error = payload?.data?.message;
        }
      }
    },
    archiveFormulariesFailure: loadingFailed,

    clearSetup(state, { payload }: PayloadAction<any>) {
      console.log("***** CLEAR SETUP ");
      state.mode = "";
      state.formulary = null;
      state.nameExist = false;
      state.message = "";
      state.messageType = "";
      state.isLoading = false;
      state.error = null;
    },
  },
});

export const fetchSelectedFormulary = createAsyncThunk(
  "setup",
  async (id: number, { dispatch }) => {
    //console.log("***** fetchSelectedFormulary ( " + id + " ) ");
    try {
      if (id === -1) {
        dispatch(setNewFormularySuccess());
        return;
      }
      dispatch(getformularyStart());
      const formulary: Formulary = await getformulary(id);

      dispatch(getFormularySuccess(formulary));
      dispatch(setFullFormulary(formulary));
    } catch (err) {
      //console.log("***** fetchFormularies - ERROR ");
      dispatch(getFormalaryFailure(err.toString()));
    }
  }
);

export const verifyFormularyName = createAsyncThunk(
  "setup",
  async (name: string, { dispatch }) => {
    //console.log("***** verifyFormularyName ( "+name+" ) ");
    try {
      dispatch(verifyFormularyNameStart());
      const exist: boolean = await checkNameExist(name);
      //console.log(exist);
      dispatch(verifyFormularyNameSuccess(exist));
      if (exist) {
        dispatch(
          postMessage({
            message: "Formulary name - " + name + " already exist",
            type: "error",
          })
        );
      }
    } catch (err) {
      //console.log("***** fetchFormularies - ERROR ");
      dispatch(getFormalaryFailure(err.toString()));
    }
  }
);

export const saveFormulary = createAsyncThunk(
  "setup",
  async (input: any, { dispatch }) => {
    // console.log("***** saveFormulary .... ");
    // console.log(input);
    if (input?.MODE === "NEW") {
    } else if (input?.MODE === "EXISTING") {
    }

    const payload = composePostBody(input);
    // console.log(" - - - - - - - - - - - - - - - -");
    // console.log(payload);
    // console.log(" - - - - - - - - - - - - - - - -");
    try {
      dispatch(saveFormularyStart());
      const resp: any = await createORUpdateFormulary(
        payload,
        input.formulary_id
      );
      // console.log("- - - -- - - - - - -- - - -");
      // console.log(resp);
      if (resp) {
        dispatch(saveFormularySuccess(resp));
        if (resp?.status === 200) {
          //dispatch(fetchSelectedFormulary(resp?.data));
          return {
            type: payload?.formulary_info?.id_formulary_type,
            id: resp?.data,
            earlier_mode: input?.MODE,
            continue: input?.CONTINUE,
          };
        } else {
          dispatch(
            postMessage({
              message: resp?.data?.message,
              type: "error",
            })
          );

          return null;
        }
      }
    } catch (err) {
      // console.log("***** saveFormulary - ERROR ");
      dispatch(saveFormularyFailure(err.toString()));
    }
  }
);

export const initCreateUsingClone = createAsyncThunk(
  "setup",
  async (input: any, { dispatch }) => {
    console.log("***** createCloneFormulary .... ");
    console.log(input);
    try {
      dispatch(createCloneFormularyStart());
      const payload = composeCreateUsingClone(input);
      const resp: any = await createFormularyUsingClone(
        input.SRC_BASE_ID,
        payload
      );
      console.log("- - - -- - - - - - -- - - -");
      console.log(resp);
      console.log("***** createCloneFormularySuccess ");
      if (resp) {
        dispatch(createCloneFormularySuccess(resp));
        //dispatch(fetchSelectedFormulary(resp?.data));
        return {
          type: input?.GENERAL_INFO?.type_id,
          id: resp,
        };
      } else {
        dispatch(
          postMessage({
            message: resp?.data?.message,
            type: "error",
          })
        );

        return null;
      }
    } catch (err) {
      console.log("***** createCloneFormularyFailure - ERROR ");
      dispatch(createCloneFormularyFailure(err.toString()));
    }
  }
);

export const initNewVersion = createAsyncThunk(
  "setup",
  async (input: any, { dispatch }) => {
    console.log("***** createNewVersion");
    console.log(input);
    try {
      dispatch(createNewVersionStart());
      const resp: any = await createCreateVersion(
        input.baseId,
        input.effectiveDate
      );
      console.log("- - - -- - - - - - -- - - -");

      console.log(resp);
      if (resp) {
        dispatch(createNewVersionSuccess(resp));
        console.log("***CODE : " + resp.status);
        if (resp.status === 200) {
          dispatch(
            postMessage({
              message: "New Version created successfully",
              type: "success",
            })
          );
        } else {
          dispatch(
            postMessage({
              message: resp?.data?.message,
              type: "error",
            })
          );
        }
        return {
          id_formulary: resp?.data?.id_formulary,
        };
      } else {
        return null;
      }
    } catch (err) {
      console.log("***** createNewVersion - Exe ");
      dispatch(createNewVersionFailure(err.toString()));
    }
  }
);

export const initArchiveFormularies = createAsyncThunk(
  "setup",
  async (IDs: any, { dispatch }) => {
    console.log("***** initArchiveFormularies");
    console.log(IDs);
    try {
      dispatch(archiveFormulariesStart());
      const resp: any = await archiveFormularies(IDs);
      console.log("- - - -- - - - - - -- - - -");
      console.log(resp);
      if (resp) {
        //"Formulary(s) Archived"
        dispatch(archiveFormulariesSuccess(resp));
        dispatch(
          postMessage({
            message: "Formulary(s) Archived",
            type: "success",
          })
        );
        dispatch(setLocationHome(2));
      }
    } catch (err) {
      console.log("***** initArchiveFormularies - Exe ");
      dispatch(archiveFormulariesFailure(err.toString()));
    }
  }
);

export const {
  getformularyStart,
  getFormularySuccess,
  getFormalaryFailure,
  setNewFormularySuccess,
  verifyFormularyNameStart,
  verifyFormularyNameSuccess,
  verifyFormularyNameFailure,
  saveFormularyStart,
  saveFormularySuccess,
  saveFormularyFailure,
  createCloneFormularyStart,
  createCloneFormularySuccess,
  createCloneFormularyFailure,
  createNewVersionStart,
  createNewVersionSuccess,
  createNewVersionFailure,
  archiveFormulariesStart,
  archiveFormulariesSuccess,
  archiveFormulariesFailure,
  clearSetup,
} = setup.actions;

export default setup.reducer;
