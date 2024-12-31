<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { login } from '../services/auth';
import BaseHeading1 from '../components/BaseHeading1.vue';
import LoaderButton from '../components/form/LoaderButton.vue';
import BaseLabel from '../components/form/BaseLabel.vue';
import BaseInput from '../components/form/BaseInput.vue';

const router = useRouter();
const { user, loading, feedback, handleSubmit } = useLogin();

function useLogin() {
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
            await login({...user.value});

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
    <BaseHeading1>Iniciar Sesión</BaseHeading1>

    <div
        v-if="feedback.message"
        class="p-4 mb-4 rounded"
        :class="{
            'bg-red-100 text-red-900': feedback.type === 'error',
            'bg-green-100 text-green-900': feedback.type === 'success',
        }"
    >
        {{ feedback.message }}
    </div>

    <form
        action="#"
        @submit.prevent="handleSubmit"
    >
        <div class="mb-4">
            <BaseLabel for="email">Email</BaseLabel>
            <BaseInput
                type="email"
                id="email"
                v-model="user.email"
            />
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