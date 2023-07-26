<template>
  <div class="flex">
    <div class="h-screen">
      <sidebar />
    </div>
    <div class="flex-1 overflow-auto">
      <navbar />
      <appmain />
    </div>
  </div>
</template>

<script lang="ts" setup>
import sidebar from "./components/sidebar.vue";
import navbar from "./components/navbar.vue";
import appmain from "./components/appmain.vue";
</script>
