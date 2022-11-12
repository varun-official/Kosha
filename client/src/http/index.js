/** @format */

import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  withCredentials: true, //this is used to send/store cookies that generated from backend
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export const sendOTP = (data) => api.post("/api/send-otp", data);
export const verifyOtp = (data) => api.post("/api/verify-otp", data);
export const activate = (data) => api.post("/api/activate", data);

// Interceptors
api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response.status === 401 &&
      originalRequest &&
      !originalRequest._isRetry
    ) {
      originalRequest._isRetry = true;

      try {
        await axios.get(
          `${process.env.REACT_APP_BASE_URL}/api/refresh`,
          {
            withCredentials: true,
          }
        );

        return api.request(originalRequest);
      } catch (error) {
        console.log(error.message);
      }
    }

    throw error;
  }
);

export default api;
