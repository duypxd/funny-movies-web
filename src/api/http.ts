import axios from "axios";

axios.defaults.baseURL = 'https://remi-api-funny-movies.herokuapp.com/';
axios.defaults.timeout = 15000;

axios.interceptors.response.use(
  (response) => response,
  (error) => console.log(error)
);

const http = {
  optionsAxios(config: any) {
    return {
      headers: {
        Authorization: `Bearer ${localStorage.token}` || null,
      },
      ...config,
    };
  },

  setAuthorizationHeader(accessToken?: string) {
    const HEADERS_AXIOS: any = axios.defaults.headers;
    HEADERS_AXIOS.Authorization = `Bearer ${localStorage.token || accessToken}`;
  },
  get(url: string, config = {}) {
    return axios.get(url, this.optionsAxios(config));
  },
  post(url: string, data = {}, config = {}) {
    return axios.post(url, data, this.optionsAxios(config));
  },
  put(url: string, data = {}, config = {}) {
    return axios.put(url, data, this.optionsAxios(config));
  },
};

export default http;
