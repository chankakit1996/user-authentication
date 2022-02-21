<template>
    <div class="body" :class="[darkMode ? 'dark-mode-on' : 'dark-mode-off']">
        <div class="wrapper">
            <div class="left">
                <div class="left-inner">
                    <Suspense>
                        <router-view v-slot="{ Component }">
                            <transition name="fade" mode="out-in">
                                <component :is="Component" class="component-body" />
                            </transition>
                        </router-view>
                    </Suspense>
                </div>
                <Loading />
            </div>
            <RightMain />
        </div>
        <DarkModeBtn @darkMode="switchDarkMode" />
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import Loading from './components/Loading.vue';
import DarkModeBtn from './view/DarkModeBtn.vue';
import RightMain from './view/RightMain.vue';

export default defineComponent({
    name: 'App',
    components: {
        DarkModeBtn,
        RightMain,
        Loading,
    },
    setup() {
        document.title = 'User Authentication';
        const darkMode = ref(false);
        const switchDarkMode = (v) => {
            darkMode.value = v;
        };
        return {
            darkMode,
            switchDarkMode,
        };
    },
});
</script>

<style scoped lang="scss">
.wrapper {
    min-height: 100vh;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    text-align: center;
}

.left {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 3rem;
    position: relative;
    @include transition;
}

.left-inner {
    display: flex;
    flex-flow: column wrap;
}

@media screen and (max-width: 48rem) {
    .wrapper {
        grid-template-columns: 1fr;
    }
}
</style>
