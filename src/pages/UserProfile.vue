<script>
import BaseHeading1 from '../components/BaseHeading1.vue';
import BaseLoader from '../components/BaseLoader.vue';
import ProfileInfo from '../components/profile/ProfileInfo.vue';
import { getUserProfileById } from '../services/user-profile';

export default {
    name: 'UserProfile',
    components: { BaseHeading1, BaseLoader, ProfileInfo },
    data() {
        return {
            user: {
                id: null,
                email: null,
                displayName: null,
                bio: null,
                career: null,
            },
            loading: false,
        }
    },
    async mounted() {
        this.loading = true;

        try {
            this.user = await getUserProfileById(this.$route.params.id);
        } catch (error) {
            console.error('[UserProfile.vue mounted] Error al traer el perfil del usuario: ', error);
            // TODO: Manejar el error..
        }

        this.loading = false;
    }
}
</script>

<template>
    <div v-if="loading" class="p-4">
        <BaseLoader />
    </div>
    <template v-else>
        <BaseHeading1>Perfil de {{ user.email }}</BaseHeading1>

        <ProfileInfo :user="user" />

        <hr class="mb-4">

        <router-link
            :to="`/usuario/${user.id}/chat`"
            class="text-blue-700 underline"
        >
            Conversación Privada con {{ user.email }}
        </router-link>
    </template>
</template>