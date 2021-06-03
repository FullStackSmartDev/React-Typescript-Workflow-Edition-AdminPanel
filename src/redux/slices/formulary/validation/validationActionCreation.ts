import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL1 } from "../../../../api/http-helper";
import { REQUEST_HEADER } from "../../../../api/http-commons";

const URL = BASE_URL1 + "/api/1/formulary-validations/";
const VALIDATION_NOTES = BASE_URL1 + "/api/1/formulary-validation-notes/";
const VALIDATION_NOTE = BASE_URL1 + "/api/1/formulary-validation-note/";

export const getValidationList = createAsyncThunk(
  "formulary/getValidationList",
  async (formulary_id: string) => {
    const requestHeaders = {
      headers: REQUEST_HEADER,
    };
    return fetch(URL + formulary_id, requestHeaders)
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .catch((error) => {
        return error;
      });
  }
);

export const getValidationListNotes = createAsyncThunk(
  "formulary/getValidationListNotes",
  async (validation_id: number) => {
    const requestPayload = {
      headers: REQUEST_HEADER,
    };
    return await fetch(VALIDATION_NOTES + validation_id, requestPayload)
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then((data) => {
        return { data, validation_id };
      })
      .catch((error) => {
        return error;
      });
  }
);

export const clearValidationListNotes = createAsyncThunk(
  "formulary/clearValidationListNotes",
  async () => {
    return await {};
  }
);

export const postValidationListNote = createAsyncThunk(
  "formulary/postValidationListNote",
  async (body: any) => {
    const requestPayload = {
      method: "POST",
      body: JSON.stringify(body.note),
      headers: REQUEST_HEADER,
    };
    console.log("requestPayload: ", requestPayload);
    return fetch(VALIDATION_NOTE + body.id_formulary_validation, requestPayload)
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        // getValidationListNotes(body.id_formulary_validation);
        return response.json();
      })
      .catch((error) => {
        return error;
      });
  }
);
