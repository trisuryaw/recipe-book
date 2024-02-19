"use client";

import axios, { AxiosError } from "axios";
import { errorProps } from "./interfaces";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

const axiosInterceptorInstance = axios.create({
    baseURL
});

axiosInterceptorInstance.interceptors.request.use(
    (config) => {
        // Modify the request config here (add headers, authentication tokens)
        const userSessionString = localStorage.getItem('user-session');
        const userSession = JSON.parse(userSessionString as string);
        if (userSession.state) {
            const { token } = userSession.state;
      
            config.headers.Authorization = `Bearer ${token}`;
    
        }
        return config;
    },
    (error) => {
      // Handle request errors here
  
        return Promise.reject(error);
    }
);
  // End of Request interceptor
  
  // Response interceptor
const thisInterceptor = axiosInterceptorInstance.interceptors.response.use(
    (response) => {
        // Modify the response data here
  
        return response;
    },
    (error) => {
        // Handle response errors here
        const err = error as AxiosError

        const { details, message, statusCode } = err.response?.data as errorProps;

        throw { details, message, statusCode };
    }
);

export const ejectResponseInterceptor = () => {
    axiosInterceptorInstance.interceptors.response.eject(thisInterceptor);
};

export default axiosInterceptorInstance;