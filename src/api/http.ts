import axios from "axios";

axios.defaults.baseURL = 'https://remi-api-funny-movies.herokuapp.com/';
axios.defaults.timeout = 15000;

const http = {
  optionsAxios(config: any) {
    return {
      headers: { Authorization: localStorage.token ? `Bearer ${localStorage.token}` : '' },
      ...config,
    };
  },
  setAuthorizationHeader(accessToken?: string) {
    const HEADERS_AXIOS: any = axios.defaults.headers;
    HEADERS_AXIOS.Authorization = `Bearer ${localStorage.token || accessToken}`;
  },
  async get(url: string, config = {}) {
    return await axios.get(url, this.optionsAxios(config));
  },
  async post(url: string, data = {}, config = {}) {
    return await axios.post(url, data, this.optionsAxios(config));
  },
  async put(url: string, data = {}, config = {}) {
    return await axios.put(url, data, this.optionsAxios(config));
  },
};

export default http;
