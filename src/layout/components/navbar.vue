<template>
    <div class="p-2 shadow-sm flex items-center">
        <div @click="handleFold" class="mr-4">
            <Fold v-if="!homeStore.isCollapse" class="w-6 cursor-pointer" />
            <Expand v-else class="w-6 cursor-pointer" />
        </div>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item v-for="item in homeStore.breadcrumbs" :to="item.path ? { path: item.path } : ''">{{
                item.name
            }}</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>

<script lang='ts' setup>
import { Fold, Expand } from "@element-plus/icons"
import home from "@/store"
const homeStore = home()
const handleFold = () => {
    homeStore.$patch({
        isCollapse: !homeStore.isCollapse
    })
}
</script>
