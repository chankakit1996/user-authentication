<template>
    <div class="forgot-pass-form">
        <div
            class="success"
            v-if="route.params.success"
            v-html="route.params.success"
        ></div>
        <div
            class="fail"
            v-else-if="route.params.fail"
            v-html="route.params.fail"
        ></div>
        <span v-else></span>
        <h1>Reset Password?</h1>

        <form @submit="resetPassword">
            <div class="form-group">
                <label for="">E-mail</label>
                <input
                    type="text"
                    placeholder="@mail.com"
                    :class="{ error: errors.email.length > 0 }"
                    @input="
                        dispatch(
                            'resetPassword/set',
                            { email: $event.target.value },
                            root
                        )
                    "
                />
                <ErrorInputText :errors="errors.email" />
            </div>
            <div class="form-group">
                <label for="">New Password</label>
                <input
                    type="password"
                    placeholder="new password"
                    :class="{ error: errors.newPassword.length > 0 }"
                    @input="
                        dispatch(
                            'resetPassword/set',
                            { newPassword: $event.target.value },
                            root
                        )
                    "
                />
                <ErrorInputText :errors="errors.newPassword" />
            </div>
            <div class="form-group">
                <button>RESET PASSWORD</button>
            </div>
            <div class="create-aacount">
                <router-link to="/login" class="go-to-sign-in"
                    >Back to Login</router-link
                >
            </div>
        </form>
    </div>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import ErrorInputText from '../components/ErrorInputText.vue';

export default defineComponent({
  components: { ErrorInputText },
    name: 'Reset',
    setup() {
        const { state, dispatch, commit, getters } = useStore();
        const route = useRoute();
        const root = { root: true };
        const errors = computed(() => {
            return getters['resetPassword/allErrors'];
        });
        const resetPassword = async (e: Event) => {
            e.preventDefault();
            await dispatch('resetPassword/set', { submitted: true }, root);
            if (!errors.value.status) {
                dispatch('resetPassword/resetPassword', undefined, root);
            }
        };
        return {
            resetPassword,
            dispatch,
            root,
            errors,
            route,
        };
    },
});
</script>

<style scoped lang="scss"></style>
