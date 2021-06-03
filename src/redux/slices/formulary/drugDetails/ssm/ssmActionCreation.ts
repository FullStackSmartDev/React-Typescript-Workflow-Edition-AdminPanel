import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  buildUrl,
  getHeaders,
  postHeaders,
  fetchRequest,
} from "../../../../../api/http-drug-details";

// const GET_DRUG_SUMMARY_SSM = BASE_URL1 + "api/1/formulary-drug-summary-ssm/3298?entity_id=3298";

// const POST_SSM_FORMULARY_DRUGS = BASE_URL1 + "api/1/formulary-drugs-ssm/3298/MCR?index=0&limit=10&entity_id=3298";

export const getDrugDetailsSSMSummary = createAsyncThunk(
  "drug_details/SSM_Summary",
  async (apiDetails: any) => {
    let GET_URL = buildUrl({ apiDetails });
    const requestHeaders = getHeaders();
    return fetchRequest(GET_URL, requestHeaders);
  }
);

export const getDrugDetailsSSMList = createAsyncThunk(
  "drug_details/SSM_list",
  async (apiDetails: any) => {
    let POST_URL = buildUrl({ apiDetails });
    const requestHeaders = postHeaders(apiDetails);
    return fetchRequest(POST_URL, requestHeaders);
  }
);
