import { BASE_URL1 } from "./http-helper";
import { REQUEST_HEADER } from "./http-commons";

export const buildUrl = ({ refUrl = BASE_URL1, apiDetails }) => {
  let apiPart = apiDetails.apiPart;
  let pathParams = apiDetails.pathParams;
  let keyVals = apiDetails.keyVals;
  let url = refUrl + apiPart;

  if (pathParams) {
    url = url + pathParams;
  }

  if (keyVals) {
    keyVals = keyVals.map((pair) => pair.key + "=" + pair.value);
    url = url + "?" + keyVals.join("&");
  }
  return url;
};

export const getHeaders = () => {
  return {
    headers: REQUEST_HEADER,
  };
};

export const postHeaders = (apiDetails) => {
  return {
    method: "POST",
    body: JSON.stringify(apiDetails?.messageBody),
    headers: REQUEST_HEADER,
  };
};

export const fetchRequest = (url, requestHeaders) => {
  return fetch(url, requestHeaders)
    .then((response) => {
      if (!response.ok) throw Error(response.statusText);
      return response.json();
    })
    .then((json) => {
      return json;
    });
};
