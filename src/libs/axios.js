import Axios from "axios";

const axios = Axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
  },
});

axios.interceptors.response.use((response) => {
  return response.data;
});

export { axios };
