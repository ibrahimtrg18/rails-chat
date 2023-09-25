import Axios from "axios";
import { LOCAL_STORAGE_KEYS, getLocalStorage } from "../utils/localstorage";

const axios = Axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + getLocalStorage(LOCAL_STORAGE_KEYS.TOKEN),
  },
});

axios.interceptors.response.use((response) => {
  return response.data;
});

export { axios };
