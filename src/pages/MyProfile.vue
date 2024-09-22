<script>
import BaseHeading1 from '../components/BaseHeading1.vue';
import { subscribeToAuth } from '../services/auth';

export default {
    name: 'MyProfile',
    components: { BaseHeading1 },
    data() {
        return {
            loggedUser: {
                id: null,
                email: null,
                displayName: null,
                bio: null,
                career: null,
            }
        }
    },
    mounted() {
        subscribeToAuth(newUserData => this.loggedUser = newUserData);
    }
}
</script>

<template>
    <BaseHeading1>Mi Perfil</BaseHeading1>

    <div class="mb-4">
        {{ loggedUser.bio || 'Acá va tu biografía...' }}
    </div>

    <dl class="mb-4">
        <dt class="font-bold">Email</dt>
        <dd class="mb-2">{{ loggedUser.email }}</dd>
        <dt class="font-bold">Nombre</dt>
        <dd class="mb-2">{{ loggedUser.displayName || 'No especificado' }}</dd>
        <dt class="font-bold">Carrera</dt>
        <dd class="mb-2">{{ loggedUser.career || 'No especificado' }}</dd>
    </dl>
</template>
