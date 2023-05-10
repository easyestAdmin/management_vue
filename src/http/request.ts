/*
 * @Description:axios拦截器
 * @Date: 2023-05-10 10:51:26
 * @Author: didi
 * @LastEditTime: 2023-05-10 11:02:41
 */
import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";
const service = axios.create({
  method: "get",
  baseURL: import.meta.env.VITE_APP_API,
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
  timeout: 10000,
});

//请求拦截
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig<any>) => {
    return config;
  },
  (error) => {
    console.log(error);
  }
);

//响应拦截器
service.interceptors.response.use((res: AxiosResponse<any, any>) => {
  return res.data;
});

export default service;
