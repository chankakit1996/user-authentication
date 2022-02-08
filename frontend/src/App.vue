<template>
    <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'App',
    setup() {
        document.title = 'Project Skeleton';
        return {};
    },
});
</script>

<style scoped lang="scss"></style>
