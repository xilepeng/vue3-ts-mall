<script setup lang="ts">
import LayoutNav from "@/views/Layout/components/LayoutNav.vue";
import LayoutHeader from "@/views/Layout/components/LayoutHeader.vue";
import LayoutFooter from "@/views/Layout/components/LayoutFooter.vue";
import LayoutFixed from "@/views/Layout/components/LayoutFixed.vue";
</script>

<template>
    <LayoutFixed></LayoutFixed>
    <LayoutNav></LayoutNav>
    <LayoutHeader></LayoutHeader>
    <!-- <RouterView :key="$route.fullPath" /> -->

    <RouterView />

    <LayoutFooter></LayoutFooter>
</template>

<script setup lang="ts">

</script>

<style scoped></style>