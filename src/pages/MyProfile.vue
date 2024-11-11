<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import BaseHeading1 from '../components/BaseHeading1.vue';
import ProfileInfo from '../components/profile/ProfileInfo.vue';
import { subscribeToAuth } from '../services/auth';

const { loggedUser } = useAuth();

function useAuth() {
    let unsubscribeFromAuth = () => {}

    const loggedUser = ref({
        id: null,
        email: null,
        displayName: null,
        photoURL: null,
        bio: null,
        career: null,
    });

    onMounted(() => {
        unsubscribeFromAuth = subscribeToAuth(newUserData => loggedUser.value = newUserData);
    });

    onUnmounted(() => unsubscribeFromAuth());

    return {
        loggedUser,
    }
}
</script>

<template>
    <div class="flex gap-4 items-end">
        <BaseHeading1>Mi Perfil</BaseHeading1>
        <div class="mb-4">
            <router-link class="text-blue-700 underline" to="/mi-perfil/editar">Editar mi Perfil</router-link>
        </div>
        <div class="mb-4">
            <router-link class="text-blue-700 underline" to="/mi-perfil/editar/foto">
                Editar mi Foto de Perfil
            </router-link>
        </div>
    </div>

    <ProfileInfo :user="loggedUser" />
</template>
