<template>
  <div
    class="bg-white shadow-lg rounded-md text-[14px] overflow-hidden cursor-pointer"
  >
    <div class="p-1 hover:bg-[#E0E0E0] flex items-center" @click="refresh">
      <el-icon> <Refresh /> </el-icon><span>刷新页面</span>
    </div>
    <div
      class="p-1 hover:bg-[#E0E0E0] flex items-center"
      @click="emits('closeCur')"
    >
      <el-icon> <CloseBold /> </el-icon><span>关闭当前</span>
    </div>
    <div
      class="p-1 hover:bg-[#E0E0E0] flex items-center"
      @click="closeOtherTags"
    >
      <el-icon> <Close /> </el-icon><span>关闭其它</span>
    </div>
    <div class="p-1 hover:bg-[#E0E0E0] flex items-center" @click="closeAllTags">
      <el-icon> <Close /> </el-icon><span>全部关闭</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import home from ".././../store";
import { useRouter } from "vue-router";
const router = useRouter();
const homeStore = home();
type Props = {
  tag: {
    path: string;
    name: string;
  };
};

const props = defineProps<Props>();
type Emits = {
  (e: "closeCur"): void;
  (e: "closeTagView"): void;
};
const emits = defineEmits<Emits>();

const refresh = () => {
  window.location.reload();
};

const closeOtherTags = () => {
  homeStore.$patch({
    navTags: [{ name: "首页", path: "/" }, props.tag],
  });
  router.push(props.tag.path);
  emits("closeTagView");
};

const closeAllTags = () => {
  homeStore.$patch({
    navTags: [{ name: "首页", path: "/" }],
  });
  router.push("/");
  emits("closeTagView");
};
</script>
