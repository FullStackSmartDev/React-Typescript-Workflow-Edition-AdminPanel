import { createAsyncThunk } from "@reduxjs/toolkit";
import { buildUrl, getHeaders, postHeaders, fetchRequest } from "../../../../../api/http-drug-details";

// const GET_DRUG_FGC = BASE_URL1 + "api/1/formulary-tiers/3298?entity_id=3298";

export const getDrugDetailsFGCTiers = createAsyncThunk(
  "drug_details/FGC",
  async (apiDetails: any) => {
    let GET_URL = buildUrl({ apiDetails });
    const requestHeaders = getHeaders();
    return fetchRequest(GET_URL, requestHeaders);
  }
);
