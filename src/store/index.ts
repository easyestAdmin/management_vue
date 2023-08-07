import { defineStore } from "pinia";
import { getMenuList } from "@/http/menu/index";
import { MenuVo } from "@/http/menu/types/menu.vo";
import { Breadcrumb, NavTags } from "./types";

type StoreState = {
  isCollapse: boolean;
  menuList: MenuVo[];
  breadcrumbs: Breadcrumb[];
  navTags: NavTags[];
};
export default defineStore("home", {
  state: (): StoreState => {
    return {
      isCollapse: false,
      menuList: [],
      breadcrumbs: [],
      navTags: [{ name: "首页", path: "/" }],
    };
  },
  actions: {
    async GenerateRoutes() {
      const { data } = await getMenuList({});
      this.menuList = data;
      return data;
    },
    addTags(tag: NavTags) {
      const isRepeat = this.navTags.find((item) => item.name === tag.name);

      isRepeat ||
        this.navTags.push({ name: tag.name as string, path: tag.path });
    },
  },
});
