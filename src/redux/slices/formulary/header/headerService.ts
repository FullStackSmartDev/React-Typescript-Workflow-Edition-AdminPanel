import axios from "axios";
import { FormularyVersionsResult } from "./headerSlice";
import { BASE_URL1 } from "../../../../api/http-helper";

const headers = {
  Authorization: "Bearer 1e05ff8b-a0af-4a8f-8915-487321900f21",
  Accept: "application/json",
  "Content-Type": "application/json;charset=UTF-8",
};

export async function getformularyVersions(formularyBaseId: any): Promise<FormularyVersionsResult> {
  let url = `${BASE_URL1}api/1/formulary-versions-list/${formularyBaseId}`
  
  try {
    const response = await axios.get(url, {
      headers: headers,
    });
    // console.log("***** getformulary Versions - Success");
    // console.log(response);
    return {
      list: response.data.data,
    };
  } catch (error) {
    console.log("***** getformulary Versions - Error");
    console.log(error);
    throw error;
  }
}
