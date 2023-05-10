<template>
  <div>登录</div>
</template>

<script lang="ts" setup>
import { login } from "@/http/login";
const loginManage = async () => {
  const { data } = await login({
    username: "鸡哥哥",
    password: "1234",
  });
  console.log(data);
};
loginManage();
</script>
<style lang="less"></style>
