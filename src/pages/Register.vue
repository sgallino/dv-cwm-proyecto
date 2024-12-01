<script setup>
import { useRouter } from 'vue-router';
import BaseHeading1 from '../components/BaseHeading1.vue';
import { register } from '../services/auth';
import { ref } from 'vue';
import LoaderButton from '../components/form/LoaderButton.vue';

const router = useRouter();

const loading = ref(false);
const user = ref({
    email: '',
    password: '',
});

async function handleSubmit() {
    loading.value = true;

    try {
        await register({...user.value});
        // console.log("Sesión iniciada con éxito.");

        router.push({ path: '/chat' });
    } catch (error) {
        // TODO: Mostrar un mensaje de feedback.
        console.error('[Login.vue] Error al autenticar: ', error);
    }
    loading.value = false;
}
</script>

<template>
    <BaseHeading1>Crear una Cuenta</BaseHeading1>

    <form
        action="#"
        @submit.prevent="handleSubmit"
    >
        <div class="mb-4">
            <label for="email" class="block mb-2">Email</label>
            <input
                type="text"
                id="email"
                class="w-full border rounded py-2 px-4"
                v-model="user.email"
            >
        </div>
        <div class="mb-4">
            <label for="password" class="block mb-2">Contraseña</label>
            <input
                type="password"
                id="password"
                class="w-full border rounded py-2 px-4"
                v-model="user.password"
            >
        </div>
        <LoaderButton :loading="loading">Crear mi Cuenta</LoaderButton>
    </form>
</template>