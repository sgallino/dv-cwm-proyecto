<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { login } from '../services/auth';
import BaseHeading1 from '../components/BaseHeading1.vue';
import LoaderButton from '../components/form/LoaderButton.vue';
import BaseLabel from '../components/form/BaseLabel.vue';

const router = useRouter();

const loading = ref(false);
const user = ref({
    email: '',
    password: '',
});

async function handleSubmit() {
    loading.value = true;

    try {
        await login({...user.value});

        router.push({ path: '/chat' });
    } catch (error) {
        // TODO: Mostrar un mensaje de feedback.
        console.error('[Login.vue] Error al autenticar: ', error);
    }
    loading.value = false;
}
</script>

<template>
    <BaseHeading1>Iniciar Sesión</BaseHeading1>

    <form
        action="#"
        @submit.prevent="handleSubmit"
    >
        <div class="mb-4">
            <BaseLabel for="email">Email</BaseLabel>
            <input
                type="text"
                id="email"
                class="w-full border rounded py-2 px-4"
                v-model="user.email"
            >
        </div>
        <div class="mb-4">
            <BaseLabel for="password">Contraseña</BaseLabel>
            <input
                type="password"
                id="password"
                class="w-full border rounded py-2 px-4"
                v-model="user.password"
            >
        </div>
        <LoaderButton :loading="loading">Ingresar</LoaderButton>
    </form>
</template>