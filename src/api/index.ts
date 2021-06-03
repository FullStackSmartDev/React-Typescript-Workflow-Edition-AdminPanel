import axios, {AxiosRequestConfig} from "axios";

const baseURL = 'https://api-dev-config-workflow.futurerx.com/api/1';
const subURL = {
    getFunctions(params: string = '') {
        return `/functions?${params}`;
    },
    getClientLobs: '/clientlobs',
    getWorkFlows(params: string = '', ) {
        return `/workflows?${params}`
    }
}

type RequestOptions = AxiosRequestConfig & { [key: string]: any };

const defaultTransforms = axios.defaults.transformResponse || ((u) => u);
const defaultTransformsArray = Array.isArray(defaultTransforms)
    ? defaultTransforms
    : [defaultTransforms];
const remote = axios.create({
    baseURL,
    transformResponse: [...defaultTransformsArray],
});

export default {
    getParams(args: { [key: string]: string | undefined }): URLSearchParams {
        const params = Object.entries(args).reduce(
            (params, [key, value]) => (value ? { ...params, [key]: value } : params),
            {}
        );
        const search = new URLSearchParams(params);
        return search;
    },

    postHeaders() {
        return {
            'Content-Type': 'application/vnd.api+json',
            Accept: 'application/vnd.api+json',
            'authorization': 'Bearer 82f7c2c1-b802-4772-b163-c42359f21fcf',
        };
    },

    getHeaders() {
        return this.postHeaders();
    },

    async get(url: string, config: RequestOptions = {}) {
        const headers = this.getHeaders();
        return await remote.get(url, { ...config, headers });
    },

    async post(
        url: string,
        params: URLSearchParams | {} | null,
        config: RequestOptions = {}
    ) {
        const headers = this.postHeaders();
        return await remote.post(url, params, { ...config, headers });
    },

    async fetchFunctions() {
        const type = 'is_workflow_needed';

        const params = this.getParams({
            'type': type
        }).toString();

        return await this.get(subURL.getFunctions(params));
    },

    async fetchClientLobs() {
        return await this.get(subURL.getClientLobs);
    },

    async fetchWorkFlows() {
        const params = this.getParams({
            'index': '0',
            'limit': '10'
        }).toString();

        const data = {
            filter: [],
            search_key: '',
            is_archived: 0
        }

        return await this.post(subURL.getWorkFlows(params), data);
    }
}
