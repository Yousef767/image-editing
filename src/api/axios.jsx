import axios from "axios";
const isDev = import.meta.env.DEV;

export const AxiosInstance = axios.create({
  baseURL: isDev ? "/api" : "https://admin.sigmaagencyjo.com/api/v1",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

export const AxiosBG = axios.create({
  baseURL: isDev ? "/bg" : "https://3rabapp.com/apps",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});
