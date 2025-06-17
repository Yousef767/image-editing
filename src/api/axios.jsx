import axios from "axios";
export const AxiosInstance = axios.create({
  baseURL: "https://admin.sigmaagencyjo.com/api/v1",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export const AxiosBG = axios.create({
  baseURL: "https://3rabapp.com/apps",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});


