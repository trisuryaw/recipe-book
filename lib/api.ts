import axios from "axios";
import axiosInterceptorInstance from "./apiConfig";
import { favoriteProps, paramsProps } from "./interfaces";

export const apiPost = async (url: string, data: any) => {
  try {
    const response = await axios.post(url, data, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const apiGet = async (url: string) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw error;
  }
}

const buildUrl = (base: string|undefined, params: paramsProps) => {
  let url = base + "?";
  for (const key in params) {
    if (params[key as keyof paramsProps]) {
      url += `${key}=${params[key as keyof paramsProps]}&`;
    }
  }
  // Remove the trailing '&'
  url = url.slice(0, -1);
  return url;
};

export const getResep = async (url:string, {
  userId,
  pageNumber = 1,
  pageSize = 8,
  recipeName,
  levelId,
  categoryId,
  time,
  sortBy
}: paramsProps) => {
  const apiUrl = buildUrl(url, {
    userId,
    pageNumber,
    pageSize,
    recipeName,
    levelId,
    categoryId,
    time,
    sortBy
  })
  try {
    const response = await axiosInterceptorInstance
      .get(apiUrl);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getDetailResep = async (url:string) => {
  try {
    const response = await axiosInterceptorInstance
      .get(url);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getDataMasters = async(url: string) => {
  try {
    const response = await axiosInterceptorInstance
      .get(url);
    return response;
  } catch (error) {
    throw error;
  }
}

export const toggleFavorite = async(url: string, userId: favoriteProps) => {
  try {
    const response = await axiosInterceptorInstance
      .put(url, userId);
    return response;
  } catch (error) {
    throw error;
  }
}