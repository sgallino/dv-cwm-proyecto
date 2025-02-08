<script setup>
import { ref, inject } from 'vue';
import { useRouter } from 'vue-router';
import { login } from '../services/auth';
import { globalFeedbackKey } from '../symbols/inject';
import BaseHeading1 from '../components/BaseHeading1.vue';
import LoaderButton from '../components/form/LoaderButton.vue';
import BaseLabel from '../components/form/BaseLabel.vue';
import BaseInput from '../components/form/BaseInput.vue';
import NotificationBox from '../components/NotificationBox.vue';

const router = useRouter();
const { user, loading, feedback, handleSubmit } = useLogin();

const { setFeedback: setGlobalFeedback } = inject(globalFeedbackKey);

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

            setGlobalFeedback({
                message: 'Sesión iniciada con éxito. ¡Hola de nuevo!',
                type: 'success',
            });

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

    <NotificationBox 
        v-if="feedback.message"
        :content="feedback" 
    />

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