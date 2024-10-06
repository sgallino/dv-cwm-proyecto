<script>
import BaseHeading1 from '../components/BaseHeading1.vue';
import BaseLoader from '../components/BaseLoader.vue';
import { getUserProfileById } from '../services/user-profile';

export default {
    name: 'UserProfile',
    components: { BaseHeading1, BaseLoader },
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

        <div class="mb-4">
            {{ user.bio || 'Acá va tu biografía...' }}
        </div>

        <dl class="mb-4">
            <dt class="font-bold">Email</dt>
            <dd class="mb-2">{{ user.email }}</dd>
            <dt class="font-bold">Nombre</dt>
            <dd class="mb-2">{{ user.displayName || 'No especificado' }}</dd>
            <dt class="font-bold">Carrera</dt>
            <dd class="mb-2">{{ user.career || 'No especificado' }}</dd>
        </dl>
    </template>
</template>