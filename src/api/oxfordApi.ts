import axios from "axios";

const baseUrl = "http://gear-kids-lb-1756228778.us-east-1.elb.amazonaws.com";

export const oxfordApi = axios.create({
  baseURL: baseUrl,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

oxfordApi.interceptors.request.use((config) => {
  config.headers.Authorization = "Bearer " + localStorage.getItem("access");
  return config;
});
