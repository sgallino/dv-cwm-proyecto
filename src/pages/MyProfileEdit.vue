<script>
import BaseHeading1 from '../components/BaseHeading1.vue';
import LoaderButton from '../components/form/LoaderButton.vue';
import { editProfile, subscribeToAuth } from '../services/auth';

let unsubscribeFromAuth = () => {}

export default {
    name: 'MyProfileEdit',
    components: { BaseHeading1, LoaderButton },
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
            },
            editing: false,
        }
    },
    methods: {
        async handleSubmit() {
            this.editing = true;
            try {
                await editProfile({...this.editData});
            } catch (error) {
                console.error("[MyProfileEdit handleSubmit] Error al editar el perfil: ", error);
            }
            this.editing = false;
        }
    },
    mounted() {
        unsubscribeFromAuth = subscribeToAuth(newUserData => {
            this.loggedUser = newUserData;
            this.editData = {
                displayName: newUserData.displayName,
                bio: newUserData.bio,
                career: newUserData.career,
            }
        });
    },
    unmounted() {
        unsubscribeFromAuth();
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
        <LoaderButton :loading="editing">Enviar</LoaderButton>
    </form>
</template>
