import axios from "axios";
import { FormularyVersionHistoryResult } from "./version-history.slice";
import { BASE_URL1 } from "../../../../api/http-helper";
import { REQUEST_HEADER } from "../../../../api/http-commons";

const headers = {
  Authorization: "Bearer 1e05ff8b-a0af-4a8f-8915-487321900f21",
  Accept: "application/json",
  "Content-Type": "application/json;charset=UTF-8"
};

// to get version histories of formulary with base formulary id
export async function getformularyVersionHistory({
  formularyBaseId,
  index,
  limit
}: {
  formularyBaseId: number;
  index: number;
  limit: number;
}): Promise<FormularyVersionHistoryResult> {
  // NOTE: In dev config the end point is ${BASE_URL1}api/1/formulary-versions. But the version dropdown uses versions-list?
  let url = `${BASE_URL1}api/1/formulary-versions/${formularyBaseId}?index=${index}&limit=${limit}`;

  try {
    const response = await axios.post(
      url,
      { filters: [], search_key: "" },
      {
        headers: REQUEST_HEADER
      }
    );
    // console.log("***** getformulary Versions - Success");
    // console.log(response);
    return {
      formulary_version_history: response.data.data
    };
  } catch (error) {
    console.log("***** getformulary Versions - Error");
    console.log(error);
    throw error;
  }
}
