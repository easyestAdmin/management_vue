<template>
  <div class="h-[100%] bg-[#545c64]">
    <div class="h-[50px] text-white flex items-center justify-center">
      <span v-if="!homeStore.isCollapse">权限管理系统</span>
    </div>
    <el-scrollbar class="wrap-scroll">
      <el-menu :unique-opened="true" :collapse="homeStore.isCollapse" active-text-color="#ffd04b" @select="getPath"
        background-color="#545c64" class="el-menu-vertical-demo w-[223px] !border-r-0" :default-active="activeMenu"
        text-color="#fff">
        <sidebaritem v-for="item in homeStore.menuList" :key="item.id!" :item="item" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script lang="ts" setup>
import sidebaritem from "@/components/sidebaritem/index.vue";
import home from "@/store";
import { useRouter, useRoute } from "vue-router";
import { computed } from "vue";
const router = useRouter();
const route = useRoute();
const homeStore = home();
const getPath = (v: any, d: any) => {
  router.push(`/${d.join("/")}`);
};
const activeMenu = computed(() => {
  const { path } = route;
  const indexs = path.split("/");

  return indexs.length ? indexs[indexs.length - 1] : "";
});
</script>
<style>
.wrap-scroll {
  height: calc(100% - 50px);
}
</style>
