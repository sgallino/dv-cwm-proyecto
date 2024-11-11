<script setup>
import BaseHeading1 from '../components/BaseHeading1.vue';
import BaseLoader from '../components/BaseLoader.vue';
import ProfileInfo from '../components/profile/ProfileInfo.vue';
import { useRoute } from 'vue-router';
import { useUserProfile } from '../composables/useUserProfile';

const route = useRoute();

const { user, loading } = useUserProfile(route.params.id);
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