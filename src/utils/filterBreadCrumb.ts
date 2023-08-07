import { Breadcrumb } from "@/store/types";
export const filterBreadCrumb = (path: string, menuList: any) => {
  let paths = path.split("/");
  //去掉空元素
  paths = paths.filter((item) => item);
  const breadCrumbs: Breadcrumb[] = [];
  paths.forEach((item, index) => {
    breadCrumbs.push({
      name: getMenuName(item, menuList),
      path: index === paths.length - 1 ? item : "",
    });
  });
  return breadCrumbs;
};

export const getMenuName = (path: string, menuList: any): string => {
  for (let i in menuList) {
    if (menuList[i].path === path) {
      return menuList[i].name;
    }
    if (menuList[i]?.children?.length) {
      if (getMenuName(path, menuList[i].children))
        return getMenuName(path, menuList[i].children);
    }
  }
  return "";
};
