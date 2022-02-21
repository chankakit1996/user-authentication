<template>
    <div class="admin-dashboard-wrapper">
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
        <h1>Admin Dashboard</h1>
        <div class="wrapper">
            <div
                class="profile form-group"
                v-for="(user, index) in users"
                :key="index"
            >
                <img :src="user.icon" alt="" />
                <div>username: {{ user.username }}</div>
                <div>email: {{ user.email }}</div>
            </div>
        </div>
        <div class="form-group">
            <button @click="logout">
                Logout your account to remove your jwt token
            </button>
        </div>
        <div class="form-group">
            <button @click="logoutAll">
                Logout all your account to remove all jwt token
            </button>
        </div>
        <h3>For more information, please check the chrome console</h3>
    </div>
</template>
<script lang="ts">
import { computed, defineComponent, onMounted, Ref, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import { User } from '../store/admin';

export default defineComponent({
    name: 'Admin',
    async setup() {
        const { state, dispatch, commit, getters } = useStore();
        const route = useRoute();
        const root = { root: true };
        const users = ref([]) as Ref<User[]>;
        const logout = () => {
            dispatch('admin/logout');
        };
        const logoutAll = () => {
            dispatch('admin/logoutAll');
        };
        users.value = await dispatch('admin/getUsers');
        return {
            route,
            users,
            logout,
            logoutAll,
        };
    },
});
</script>

<style scoped lang="scss">
.wrapper {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 20px;
}

.profile {
    flex-basis: 25%;
    background: $color-light-gray;
    display: flex;
    flex-direction: column;

    @include transition;

    > div {
    }
}

.dark-mode-on {
    .profile {
        background: $color-dark;
        border: 1px $color-white solid;

        > div {
            // color:
        }
    }
}
</style>
