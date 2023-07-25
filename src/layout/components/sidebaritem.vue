<template>
    <el-sub-menu class="grid" v-if="props.item.children?.length" :index="props.item.path">
        <template #title>
            <component class="w-[15px] mr-2 ml-1" :is="props.item.icon" />
            <span>{{ props.item.name }}</span>
        </template>
        <sidebaritem v-for="i in props.item.children" :key="i.id" :item="i"></sidebaritem>
    </el-sub-menu>
    <el-menu-item v-else :index="props.item.path">
        <component class="w-[15px] mr-2 ml-1" :is="props.item.icon" /> <span>{{ props.item.name }}</span>
    </el-menu-item>
</template>

<script lang='ts' setup>

type Props = {
    item: any
}
const props = defineProps<Props>()


</script>
