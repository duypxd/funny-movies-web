import axios from "axios";

axios.defaults.baseURL = 'https://remi-api-funny-movies.herokuapp.com/';
axios.defaults.timeout = 15000;

const http = {
  setAuthorizationHeader(accessToken?: string) {
    const HEADERS_AXIOS: any = axios.defaults.headers;
    HEADERS_AXIOS.Authorization = `Bearer ${localStorage.token || accessToken}`;
  },
  async get(url: string) {
    return await axios.get(url);
  },
  async post(url: string, data = {}) {
    return await axios.post(url, data);
  },
  async put(url: string, data = {}) {
    return await axios.put(url, data);
  },
};

export default http;
