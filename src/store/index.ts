import { defineStore } from "pinia";
import { getMenuList } from "@/http/menu/index";
import router from "@/router";
import { MenuVo } from "@/http/menu/types/menu.vo";
type StoreState = {
  isCollapse: boolean;
  menuList: MenuVo[];
};
export default defineStore("home", {
  state: (): StoreState => {
    return {
      isCollapse: false,
      menuList: [],
    };
  },
  actions: {
    async GenerateRoutes() {
      const { data } = await getMenuList({});
      this.menuList = data;
      return data;
    },
    resetRouter() {
      router.replace(router.options.history.location);
    },
  },
});
