<template>
    <div class="loading-wrapper" v-if="loading > 0">
        <div class="gif-wrapper">
            <div class="gif-inner">
                <div class="loading"></div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
    name: 'Loading',
    setup() {
        const store = useStore();
        const loading = computed(() => store.state.loading.loading);
        return {
            loading,
        };
    },
});
</script>

<style scoped lang="scss">
.gif-wrapper {
    position: fixed;
    width: 100%;
    height: 100%;
    background: $color-dark;
    opacity: 0.55;
}

.dark-mode-on {
    .gif-wrapper {
        background: $color-white;
        opacity: 0.25;
    }
}

.loading-wrapper {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 10000;

    .gif-inner {
        position: relative;
        width: 100%;
        height: 100%;

        > .loading {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            margin: auto;
            width: 55px;
            height: 55px;
            background: url('https://os.freightamigo.com/assets/img/ajax-loading.gif')
                no-repeat;
            background-size: contain;
        }
    }
}
</style>
