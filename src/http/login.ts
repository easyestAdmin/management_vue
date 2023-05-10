/*
 * @Description:
 * @Date: 2023-05-10 11:03:23
 * @Author: didi
 * @LastEditTime: 2023-05-10 11:26:21
 */
import request from "./request";

export const login = (data: any) => {
  return request({
    url: "/auth/login",
    data,
    method: "post",
  });
};
