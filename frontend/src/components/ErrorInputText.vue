<template>
    <TransitionGroup tag="div" name="slide">
        <div
            class="error-text"
            v-for="(error, index) in errors"
            :key="index"
        >
            {{ error }}
        </div>
    </TransitionGroup>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'Error Input Text',
    props: {
        errors: {
            type: Array,
            default: []
        }
    },
    setup(props, { attrs, slots, emit, expose }) {
        return {};
    },
});
</script>

<style scoped lang="scss"></style>
