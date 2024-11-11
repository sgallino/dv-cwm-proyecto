<script setup>
import BaseHeading1 from '../components/BaseHeading1.vue';
import ProfileInfo from '../components/profile/ProfileInfo.vue';
import { useAuth } from '../composables/useAuth';

const { loggedUser } = useAuth();
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
