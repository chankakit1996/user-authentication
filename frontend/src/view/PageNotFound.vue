<template>
    <div class="page-not-found-wrapper">
        <h1>Sorry, this page does not exist</h1>
        <div class="form-group">
            <button
                @click="
                    () => {
                        router.back();
                    }
                "
            >
                Go Back
            </button>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default defineComponent({
    name: 'Page not found',
    setup(props, { attrs, slots, emit, expose }) {
        const router = useRouter();
        return {
            router,
        };
    },
});
</script>

<style scoped lang="scss"></style>
