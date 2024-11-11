<script setup>
import { onMounted, ref } from 'vue';
import BaseHeading1 from '../components/BaseHeading1.vue';
import BaseLoader from '../components/BaseLoader.vue';
import ProfileInfo from '../components/profile/ProfileInfo.vue';
import { getUserProfileById } from '../services/user-profile';
import { useRoute } from 'vue-router';

const route = useRoute();

const user = ref({
    id: null,
    email: null,
    displayName: null,
    bio: null,
    career: null,
});
const loading = ref(false);

onMounted(async () => {
    loading.value = true;

    try {
        user.value = await getUserProfileById(route.params.id);
    } catch (error) {
        console.error('[UserProfile.vue mounted] Error al traer el perfil del usuario: ', error);
        // TODO: Manejar el error..
    }

    loading.value = false;
});
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