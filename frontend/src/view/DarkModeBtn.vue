<template>
    <a
        href="#"
        @click="switchDarkMode"
        class="dark-mode-btn"
        :class="[darkMode ? 'active' : 'non-active']"
    >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
        >
            <path
                d="M21.55 1C23.15 3.4 24.1 6.3 24.1 9.4C24.15 17.75 17.3 24.5 8.85 24.5C6 24.5 3.3 23.7 1 22.35C3.6 27.5 8.95 31 15.15 31C23.9 31 31 24 31 15.35C31 8.95 27.1 3.45 21.55 1Z"
                fill="black"
            />
        </svg>
    </a>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
    name: 'Dark Mode Btn',
    emits: ['darkMode'],
    setup(props, context) {
        const darkMode = ref(false);
        const switchDarkMode = (event) => {
            event.preventDefault()
            darkMode.value = !darkMode.value;
            context.emit('darkMode', darkMode.value);
        };
        return {
            darkMode,
            switchDarkMode
        };
    },
});
</script>

<style scoped lang="scss">
.dark-mode-btn {
    position: fixed;
    left: 1rem;
    bottom: 1rem;
    z-index: 10;
    background-color: $color-white;
    padding: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid $color-mid-gray;
    border-radius: 50%;

    @include transition;

    svg {
        filter: invert(67%) sepia(7%) saturate(757%) hue-rotate(182deg)
            brightness(95%) contrast(88%);
        width: 16px;
        height: 16px;
    }

    &.active {
        background-color: $color-p;
        border-color: $color-p;
        svg {
            filter: invert(91%) sepia(31%) saturate(1482%) hue-rotate(328deg)
                brightness(102%) contrast(101%);
        }
    }
}
</style>
