<template>
    <div class="p-2  shadow-sm">
        <div @click="handleFold">
            <Fold v-if="!homeStore.isCollapse" class="w-6 cursor-pointer" />
            <Expand v-else class="w-6 cursor-pointer" />
        </div>
    </div>
    <div class="p-2">
        <!-- <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">homepage</el-breadcrumb-item>
            <el-breadcrumb-item><a href="/">promotion management</a></el-breadcrumb-item>
            <el-breadcrumb-item>promotion list</el-breadcrumb-item>
            <el-breadcrumb-item>promotion detail</el-breadcrumb-item>
        </el-breadcrumb> -->
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
