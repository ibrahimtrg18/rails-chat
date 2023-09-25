import Axios from "axios";
import {
  LOCAL_STORAGE_KEYS,
  getLocalStorage,
  removeLocalStorage,
} from "../utils/localstorage";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const axios = Axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axios.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.response.status !== 401) {
      return Promise.reject(error);
    }

    // remove token in local storage if getting 401
    removeLocalStorage(LOCAL_STORAGE_KEYS.TOKEN);
    return Promise.reject(error);
  }
);

axios.interceptors.request.use((config) => {
  const token = getLocalStorage(LOCAL_STORAGE_KEYS.TOKEN);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export { axios };
