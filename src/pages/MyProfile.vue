<script>
import BaseHeading1 from '../components/BaseHeading1.vue';
import ProfileInfo from '../components/profile/ProfileInfo.vue';
import { subscribeToAuth } from '../services/auth';

let unsubscribeFromAuth = () => {}

export default {
    name: 'MyProfile',
    components: { BaseHeading1, ProfileInfo },
    data() {
        return {
            loggedUser: {
                id: null,
                email: null,
                displayName: null,
                photoURL: null,
                bio: null,
                career: null,
            }
        }
    },
    mounted() {
        unsubscribeFromAuth = subscribeToAuth(newUserData => this.loggedUser = newUserData);
    },
    unmounted() {
        unsubscribeFromAuth();
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
