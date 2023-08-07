<template>
  <div class="p-2 shadow-sm flex items-center">
    <div @click="handleFold" class="mr-4">
      <Fold v-if="!homeStore.isCollapse" class="w-6 cursor-pointer" />
      <Expand v-else class="w-6 cursor-pointer" />
    </div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item v-for="item in homeStore.breadcrumbs" :to="item.path ? { path: item.path } : ''">
        {{ item.name }}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>

  <div class="shadow-sm py-1">
    <el-scrollbar>
      <div class="flex">
        <el-tag @contextmenu.prevent="openMenu($event, item.path)" v-for="(item, index) in homeStore.navTags"
          @click="handelTo(item)" :key="item.name" class="ml-2 cursor-pointer flex-shrink-0"
          :effect="currentPath === item.path ? 'dark' : ''" type="primary" :closable="item.path != '/'"
          @close="handleClose(index, item.path)">
          {{ item.name }}
          <teleport to="body">
            <tagsview v-if="isTagView" @closeTagView="isTagView = false" :tag="item" class="w-[100px] fixed"
              :style="tagViewStyle" @closeCur="handleClose(index, item.path)" />
          </teleport>
        </el-tag>
      </div>
    </el-scrollbar>
  </div>
</template>

<script lang="ts" setup>
import { Fold, Expand } from "@element-plus/icons";
import home from "@/store";
import { useRoute, useRouter } from "vue-router";
import { watch, ref } from "vue";
import tagsview from "@/components/tagsview/index.vue";
const isTagView = ref(false);
const route = useRoute();
const router = useRouter();
const currentPath = ref();
watch(
  () => route.path,
  (path) => {
    currentPath.value = path;
  },
  { immediate: true }
);
const homeStore = home();
const handleFold = () => {
  homeStore.$patch({
    isCollapse: !homeStore.isCollapse,
  });
};

const handelTo = (item: any) => {
  router.push(item.path);
};

const handleClose = (index: number, path: string) => {
  homeStore.navTags.splice(index, 1);

  if (path === currentPath.value) {
    const length = homeStore.navTags.length;
    length && router.push(homeStore.navTags[length - 1].path);
  }
};


const listener = () => {
  isTagView.value = false;
  document.removeEventListener("click", listener);
};
const tagViewStyle = ref({});
const openMenu = (e: any, path: string) => {
  isTagView.value = true;
  document.addEventListener("click", listener);

  tagViewStyle.value = {
    left: e.clientX + "px",
    top: e.clientY + "px",
  };
};
</script>
