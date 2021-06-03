import axios from "axios";
import { BASE_URL1 } from "../../../../api/http-helper";
import { Formulary } from "./../setup/formulary";
import { FormularyPost } from "./../setup/formularyPayload";
import { REQUEST_HEADER } from "../../../../api/http-commons";

export async function getformulary(
  formulary_id: any
): Promise<Formulary | any> {
  let url = `${BASE_URL1}api/1/formulary-setup/${formulary_id}?entity_id=${formulary_id}`;
  try {
    const response = await axios.get(url, {
      headers: REQUEST_HEADER,
    });
    //console.log("***** SETUP getformulary  - Success");
    //console.log(response);
    if (response?.data?.code === "200") {
      return response?.data?.result;
    }
    return null;
  } catch (error) {
    // console.log("***** getformularies - Error");
    // console.log(error);
    throw error;
  }
}

export async function createORUpdateFormulary(
  payload: any,
  id_formulary: number
): Promise<any> {
  // TODO: CLIENT_ID
  const clientId = 1;
  //console.log("***** createORUpdateFormulary ");
  let url = `${BASE_URL1}api/1/formulary-setup`;
  try {
    let response;
    if (id_formulary > 0) {
      url += `/${id_formulary}/${clientId}?entity_id=${id_formulary}`;
      response = await axios.put(url, payload, {
        headers: REQUEST_HEADER,
      });
    } else {
      url += `/${clientId}`;
      response = await axios.post(url, payload, {
        headers: REQUEST_HEADER,
      });
    }

    // console.log("***** createORUpdateFormulary - Success");
    // console.log(response);
    if (response?.data?.code === "200") {
      return {
        data: response?.data?.id_formulary,
        status: 200,
      };
    }
    return null;
  } catch (error) {
    // console.log("***** createORUpdateFormulary - Error");
    //console.log(error);
    const { response } = error;
    const { request, ...errorObject } = response; // take everything but 'request'
    console.log(errorObject);
    return {
      status: errorObject.status,
      data: errorObject.data,
    };
  }
}

export async function getAllFormularyVersions(
  payload: any,
  id_base_formulary: number,
  limit: number,
  index: number
): Promise<any> {
  // TODO: CLIENT_ID
  const clientId = 1;
  let url = `${BASE_URL1}api/1/formulary-versions`;
  try {
    let response;
    url += `/${id_base_formulary}?index=${index}&limit=${limit}`;
    response = await axios.post(url, payload, {
      headers: REQUEST_HEADER,
    });

    // console.log("***** createORUpdateFormulary - Success");
    // console.log(response);
    if (response?.data?.code === "200") {
      return {
        data: response?.data,
        status: 200,
      };
    }
    return null;
  } catch (error) {
    throw error;
  }
}

export function composePostBody(input: any): any {
  // console.log("***** composeBody");

  const payload: any = {};
  payload.formulary_info = {};

  const typeInfo = getTypeInfo(input.GENERAL_INFO?.type_id);

  payload.formulary_info.is_standard_template = null;
  payload.formulary_info.parent_formulary_id = null;
  payload.formulary_info.formulary_build_method = input.GENERAL_INFO?.method;
  payload.formulary_info.formulary_name = input.GENERAL_INFO?.name;
  payload.formulary_info.contract_year = input.GENERAL_INFO?.service_year;
  payload.formulary_info.abbreviation = input.GENERAL_INFO?.abbreviation;

  if (typeInfo.id_lob == 1) {
    payload.formulary_info.resembl_formulary_id =
      input.GENERAL_INFO?.selectedResemblanceFormulary;
  } else {
    payload.formulary_info.resemble_formulary_id = null;
  }
  payload.formulary_info.formulary_description =
    input.GENERAL_INFO?.description;
  payload.formulary_info.is_closed_formulary =
    input.GENERAL_INFO?.is_closed_formulary;
  // payload.formulary_info.id_formulary_type = input.GENERAL_INFO?.type_id;
  payload.formulary_info.id_formulary_type = typeInfo.id_formulary_type;

  payload.formulary_info.cms_formulary_id = "";
  payload.formulary_info.abridged_forumulary_creation = null;
  payload.formulary_info.formulary_basis = null;
  payload.formulary_info.is_carve_out = null;
  if (input?.tiers?.length === 0) {
    payload.formulary_info.number_of_tiers = null;
  } else {
    payload.formulary_info.number_of_tiers = input?.tiers?.length;
  }
  payload.formulary_info.id_classification_system = parseInt(
    input.GENERAL_INFO?.classification_system
  );
  payload.formulary_info.id_state = !input.GENERAL_INFO?.state_id
    ? null
    : input.GENERAL_INFO?.state_id;
  // if (input.GENERAL_INFO?.type_id === 6) {
  //   payload.formulary_info.id_lob = 4;
  // } else {
  //   payload.formulary_info.id_lob = 1;
  // }
  payload.formulary_info.id_lob = typeInfo.id_lob;
  payload.formulary_info.import_file_path = "";
  payload.formulary_info.import_file_name = "";
  payload.formulary_info.id_classification_system_other = "";
  // payload.formulary_info.min_tiers = 1;
  // payload.formulary_info.max_tiers = 20;

  payload.formulary_info.min_tiers = typeInfo.min_tiers;
  payload.formulary_info.max_tiers = typeInfo.max_tiers;

  // if (input.GENERAL_INFO?.type_id === 6) {
  //   payload.formulary_info.code_value = "COMM";
  // } else {
  //   payload.formulary_info.code_value = "MC";
  // }
  payload.formulary_info.code_value = typeInfo.code_value;

  payload.formulary_info.medicare_types_ref = [];
  payload.formulary_info.medicare_types_ref_other = false;
  payload.formulary_info.effective_date = input.GENERAL_INFO?.effective_date;
  payload.formulary_info.id_submission_month = null;
  //payload.formulary_info.formulary_type_name = input.GENERAL_INFO?.type;
  payload.formulary_info.formulary_type_name = typeInfo.formulary_type_name;

  // CLASSIFICATION  - - - - - - - - - - - - -
  payload.classification_system_info = {
    id_classification_system: parseInt(
      input.GENERAL_INFO?.classification_system
    ),
    is_custom: false,
    classification_system: "",
  };
  payload.carve_out_info = {
    carve_outs: [],
    custom_carve_outs: [],
    removed_formulary_carve_outs: [],
  };
  payload.asscociated_contract_pbp_info = {
    asscociated_contract_pbps: [],
    removed_formulary_asscociated_contract_pbps: [],
  };
  // TIER DETAILS  - - - - - - - - - - - - -
  // console.log("------------------------------");
  // console.log(input?.tiers);
  // console.log("------------------------------");
  const tierList = composeTier(input?.tiers);
  // console.log(tierList);
  // console.log("------------------------------");
  // payload.tiers = input?.tiers;
  payload.tiers = tierList;

  // DESIGN  - - - - - - - - - - - - -
  payload.edit_info = {
    edits: input?.edit_info?.edits,
    edits_no: input?.edit_info?.edits_no,
    custom_edits: input?.edit_info?.custom_edits,
    removed_formulary_edits: input?.edit_info?.removed_formulary_edits,
  };
  if (input?.edit_info?.custom_edits === "") {
    payload.edit_info.custom_edits = [];
  }

  // SUPP
  // console.log(
  //   " SUPP :",
  //   input?.supplemental_benefit_info?.supplemental_benefits
  // );
  payload.supplemental_benefit_info = {
    supplemental_benefits: !input?.supplemental_benefit_info
      ?.supplemental_benefits
      ? []
      : input?.supplemental_benefit_info?.supplemental_benefits,
    custom_supplemental_benefits: [],
    removed_formulary_supplemental_benefits: [],
  };
  let validation = false;
  if (input?.CONTINUE) {
    validation = true;
  }
  payload.is_validation_required = validation;
  payload.cms_override = false;
  // MEDICARE INFO  - - - - - - - - - - - - -
  if (
    input.GENERAL_INFO?.id_formulary_type === 1 ||
    input.GENERAL_INFO?.id_formulary_type === 2
  ) {
    // console.log(
    //   " CONT :",
    //   input.medicare_contract_type_info.medicare_contract_types
    // );
    if (!input.medicare_contract_type_info.medicare_contract_types) {
      input.medicare_contract_type_info.medicare_contract_types = [];
    }
    payload.medicare_contract_type_info = input.medicare_contract_type_info;
  }
  return payload;
}

function composeTier(inputList: any[]) {
  let list: any[] = [];

  list = inputList.map((item) => {
    if (item.is_custom === true) {
      return {
        id_formulary_tier: item.id_formulary_tier,
        id_tier: item.id_tier,
        id_tier_label: item.id_tier_label,
        is_custom: item.is_custom,
        tier_label_name: item.tier_label_name,
      };
    } else {
      return {
        id_formulary_tier: item.id_formulary_tier,
        id_tier: item.id_tier,
        id_tier_label: item.id_tier_label,
      };
    }
  });

  return list;
}

export function composeCreateUsingClone(input: any): any {
  // console.log("***** composeCreateUsingClone");

  const payload: any = {};
  payload.formulary_info = {};
  const typeInfo = getTypeInfo(input.GENERAL_INFO?.type_id);
  payload.formulary_info.formulary_name = input.GENERAL_INFO?.name;
  payload.formulary_info.effective_date = input.GENERAL_INFO?.effective_date;
  payload.formulary_info.id_lob = typeInfo.id_lob;

  return payload;
}

export async function createFormularyUsingClone(
  baseId: number,
  payload: any
): Promise<number | null> {
  let url = `${BASE_URL1}api/1/clone-formulary-setup/${baseId}/1?entity_id=0`;
  try {
    const response = await axios.post(url, payload, {
      headers: REQUEST_HEADER,
    });
    // console.log("***** clone - api");
    // console.log(response);
    // console.log(response.data);
    if (response?.data?.code === "200") {
      return response?.data?.id_formulary;
    }
    return null;
  } catch (error) {
    // console.log("***** clone - Error");
    // console.log(error);
    throw error;
  }
}

function getTypeInfo(
  formulary_type_id: number
): {
  id_formulary_type: number;
  id_lob: number;
  code_value: string;
  formulary_type_name: string;
  min_tiers: number;
  max_tiers: number;
} {
  let typeInfo: any = {
    id_formulary_type: formulary_type_id,
    id_lob: 0,
    code_value: "",
    formulary_type_name: "",
    min_tiers: 0,
    max_tiers: 0,
  };
  if (formulary_type_id === 1) {
    typeInfo.id_lob = 1;
    typeInfo.code_value = "MC";
    typeInfo.formulary_type_name = "Medicare";
    typeInfo.min_tiers = 1;
    typeInfo.max_tiers = 7;
  } else if (formulary_type_id === 2) {
    typeInfo.id_lob = 1;
    typeInfo.code_value = "MMP";
    typeInfo.formulary_type_name = "Medicare-Medicaid Plan (MMP)";
    typeInfo.min_tiers = 2;
    typeInfo.max_tiers = 6;
  } else if (formulary_type_id === 3) {
    typeInfo.id_lob = 2;
    typeInfo.code_value = "MMCD";
    typeInfo.formulary_type_name = "Managed Medicaid";
    typeInfo.min_tiers = 1;
    typeInfo.max_tiers = 3;
  } else if (formulary_type_id === 4) {
    typeInfo.id_lob = 2;
    typeInfo.code_value = "SMCD";
    typeInfo.formulary_type_name = "State Medicaid";
    typeInfo.min_tiers = 1;
    typeInfo.max_tiers = 3;
  } else if (formulary_type_id === 5) {
    typeInfo.id_lob = 3;
    typeInfo.code_value = "EXNG";
    typeInfo.formulary_type_name = "Exchange";
    typeInfo.min_tiers = 1;
    typeInfo.max_tiers = 20;
  } else if (formulary_type_id === 6) {
    typeInfo.id_lob = 4;
    typeInfo.code_value = "COMM";
    typeInfo.formulary_type_name = "Commercial";
    typeInfo.min_tiers = 1;
    typeInfo.max_tiers = 20;
  }
  return typeInfo;
}

export async function createCreateVersion(
  baseId: number,
  effectiveDate: string
): Promise<any | null> {
  let url = `${BASE_URL1}api/1/formulary-version/${baseId}/1`;
  const payload = {
    effective_date: effectiveDate,
  };
  try {
    const response = await axios.post(url, payload, {
      headers: REQUEST_HEADER,
    });
    // console.log("***** SVC - NewVersion - Resp");
    // console.log(response);
    // console.log(response.data);
    if (response?.data?.code === "200") {
      // return response?.data?.id_formulary;
      return {
        status: 200,
        data: response?.data,
      };
    }
    return null;
  } catch (error) {
    // console.log("***** SVC - NewVersion - Error");
    // console.log(error);
    const { response } = error;
    const { request, ...errorObject } = response; // take everything but 'request'
    // console.log(errorObject);
    return {
      status: errorObject.status,
      data: errorObject.data,
    };

    throw error;
  }
}

export async function archiveFormularies(formulary_ids: any[]): Promise<any> {
  // console.log("SRC - archiveFormularies ", formulary_ids);

  //POST: http://localhost:8082/api/1/archiveformulary/3515
  // TODO: CLIENT_ID
  const clientId = 1;
  try {
    if (formulary_ids.length > 0) {
      let requests = Array();
      formulary_ids.map((formulary_id) => {
        let url = `${BASE_URL1}api/1/archiveformulary/${formulary_id}`;
        let request = axios.post(url, null, {
          headers: REQUEST_HEADER,
        });
        requests.push(request);
      });
      // console.log(requests);
      let responses = await axios.all(requests);
      // console.log(responses);
      if (responses && responses.length > 0) {
        if (responses[0]?.data?.code === "200") {
          // return response?.data?.id_formulary;
          return {
            status: 200,
            data: { message: "Formulary(s ) Archieve successfully." },
          };
        }
      }
    }
    return null;
  } catch (error) {
    // console.log("***** SVC - NewVersion - Error");
    // console.log(error);
    const { response } = error;
    const { request, ...errorObject } = response; // take everything but 'request'
    // console.log(errorObject);
    return {
      status: errorObject.status,
      data: errorObject.data,
    };

    throw error;
  }
}

export async function checkNameExist(name: string): Promise<boolean | any> {
  let url = `${BASE_URL1}api/1/check-formulary-name/`;
  if (name != null && name != undefined && name != "") {
    url = url + `${name}`;
  } else {
    url = url + ` `;
  }
  // url= url+`/${this.clientId}`;
  url = url + `/1`;
  try {
    const response = await axios.get(url, {
      headers: REQUEST_HEADER,
    });
    // console.log("***** checkNameExist  - Success");
    // console.log(response);
    if (response?.data?.code === "200") {
      return response?.data?.result?.is_formulary_name_exists;
    }
    return true;
  } catch (error) {
    // console.log("***** checkNameExist - Error");
    // console.log(error);
    throw error;
  }
}

export async function deleteFullFormulary(formulary_ids: any[]): Promise<any> {
  // TODO: CLIENT_ID
  const clientId = 1;
  try {
    if (formulary_ids.length > 0) {
      let requests = Array();

      formulary_ids.map((formulary_id) => {
        let url = `${BASE_URL1}api/1/formulary-version/${formulary_id}`;
        let request = axios.delete(url, {
          headers: REQUEST_HEADER,
        });
        requests.push(request);
      });

      let responses = await axios.all(requests);
      if (responses && responses.length > 0) {
        responses.map((response) => {
          if (response?.data?.code !== "200") {
            return null;
          }
        });
        return "success";
      }
    }
    return null;
  } catch (error) {
    throw error;
  }
}

export async function deleteFormulary(formulary_id: any): Promise<any> {
  // TODO: CLIENT_ID
  const clientId = 1;
  let url = `${BASE_URL1}api/1/formulary-version/${formulary_id}`;
  try {
    let response = await axios.delete(url, {
      headers: REQUEST_HEADER,
    });
    if (response?.data?.code === "200") {
      return {
        data: "success",
        status: 200,
      };
    }
    return null;
  } catch (error) {
    throw error;
  }
}
