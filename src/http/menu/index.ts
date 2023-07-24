import request from "../request";
import { MenuVo } from "./types/menu.vo";
export const getMenuList = (data: any) => {
  return request({
    url: "/menu",
    params: data,
    method: "get",
  });
};
