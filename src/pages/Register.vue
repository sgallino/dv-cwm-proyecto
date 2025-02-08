<script setup>
import { useRouter } from 'vue-router';
import BaseHeading1 from '../components/BaseHeading1.vue';
import { register } from '../services/auth';
import { ref } from 'vue';
import LoaderButton from '../components/form/LoaderButton.vue';
import NotificationBox from '../components/NotificationBox.vue';

const router = useRouter();

const { user, loading, feedback, handleSubmit } = useRegister();

function useRegister() {
    const loading = ref(false);
    const user = ref({
        email: '',
        password: '',
    });
    const feedback = ref({
        message: null,
        type: null,
    });

    async function handleSubmit() {
        loading.value = true;

        try {
            await register({...user.value});
            // console.log("Sesión iniciada con éxito.");

            router.push({ path: '/chat' });
        } catch (error) {
            feedback.value = {
                message: error,
                type: 'error',
            };
            console.error('[Login.vue] Error al autenticar: ', error);
        }
        loading.value = false;
    }

    return {
        user,
        loading,
        feedback,
        handleSubmit,
    }
}
</script>

<template>
    <BaseHeading1>Crear una Cuenta</BaseHeading1>

    <NotificationBox 
        v-if="feedback.message"
        :content="feedback"
    />

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