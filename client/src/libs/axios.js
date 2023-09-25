import Axios from "axios";
import {
  LOCAL_STORAGE_KEYS,
  getLocalStorage,
  removeLocalStorage,
} from "../utils/localstorage";

const axios = Axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + getLocalStorage(LOCAL_STORAGE_KEYS.TOKEN),
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

export { axios };
