<script>
import BaseHeading1 from '../components/BaseHeading1.vue';
import { subscribeToAuth } from '../services/auth';

export default {
    name: 'MyProfileEdit',
    components: { BaseHeading1 },
    data() {
        return {
            loggedUser: {
                id: null,
                email: null,
                displayName: null,
                bio: null,
                career: null,
            },
            editData: {
                displayName: null,
                bio: null,
                career: null,
            }
        }
    },
    methods: {
        async handleSubmit() {
            // TODO...
        }
    },
    mounted() {
        subscribeToAuth(newUserData => this.loggedUser = newUserData);
    }
}
</script>

<template>
    <BaseHeading1>Editar Mi Perfil</BaseHeading1>

    <form 
        action="#"
        @submit.prevent="handleSubmit"
    >
        <div class="mb-4">
            <label for="bio" class="block mb-2">Biografía</label>
            <textarea
                id="bio"
                class="w-full border rounded py-2 px-4"
                v-model="editData.bio"
            ></textarea>
        </div>
        <div class="mb-4">
            <label for="displayName" class="block mb-2">Nombre de usuario</label>
            <input
                type="text"
                id="displayName"
                class="w-full border rounded py-2 px-4"
                v-model="editData.displayName"
            >
        </div>
        <div class="mb-4">
            <label for="career" class="block mb-2">Carrera</label>
            <input
                type="text"
                id="career"
                class="w-full border rounded py-2 px-4"
                v-model="editData.career"
            >
        </div>
        <button
            type="submit"
            class="py-2 px-4 rounded bg-blue-500 text-white"
        >Enviar</button>
    </form>
</template>
