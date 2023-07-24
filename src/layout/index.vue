<template>
    <div class="flex">
        <div class="h-screen">
            <sidebar @toRoute="toRoute" />
        </div>
        <div class="flex-1">
            <navbar />
            <appmain />
        </div>
    </div>
</template>

<script lang='ts' setup>
import sidebar from './components/sidebar.vue';
import navbar from './components/navbar.vue';
import appmain from './components/appmain.vue';
import router from '@/router';
const toRoute = (v: any) => {
    console.log(v);

}

</script>
