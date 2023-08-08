<template>
    <el-sub-menu class="grid" v-if="props.item.children?.length && !props.item.hidden" :index="props.item.path">
        <template #title>
            <component class="w-[15px] mr-2 ml-1" :is="props.item.icon" />
            <span>{{ props.item.name }}</span>
        </template>
        <index v-for="i in props.item.children" :key="i.id" :item="i"></index>
    </el-sub-menu>
    <el-menu-item v-else v-if="!props.item.hidden" :index="props.item.path">
        <component class="w-[15px] mr-2 ml-1" :is="props.item.icon" /> <span>{{ props.item.name }}</span>
    </el-menu-item>
</template>

<script lang='ts' setup>
type Props = {
    item: any
}
const props = defineProps<Props>()

</script>
