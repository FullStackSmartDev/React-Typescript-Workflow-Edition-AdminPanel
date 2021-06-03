import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL1 } from "../../../api/http-helper";
import FormularyServices from "../../../services/formulary.services";

const URL = BASE_URL1 + "/api/1/formulary-summary/";

export const getFormularySummary = createAsyncThunk(
  "formulary_summary/getFormularySummary",
  async (summary_id: string) => {
    console.log("getFormularySummary action creator:: url: " + URL + summary_id);
    const requestHeaders  = {
        headers: {
            'Authorization': 'Bearer 1e05ff8b-a0af-4a8f-8915-487321900f21',
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8',
        }
    }
    return fetch(URL + summary_id,requestHeaders)
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then((json) => {
        console.log("getFormularySummary: ", json);
        return json;
      });
  }
);