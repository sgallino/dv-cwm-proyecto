<script>
import BaseHeading1 from '../components/BaseHeading1.vue';
import { login } from '../services/auth';

export default {
    name: 'Login',
    components: { BaseHeading1 },
    data() {
        return {
            loading: false,
            user: {
                email: '',
                password: '',
            },
        }
    },
    methods: {
        async handleSubmit() {
            this.loading = true;

            try {
                await login({...this.user});
                // console.log("Sesión iniciada con éxito.");

                this.$router.push({ path: '/chat' });
            } catch (error) {
                // TODO: Mostrar un mensaje de feedback.
                console.error('[Login.vue] Error al autenticar: ', error);
            }
            this.loading = false;
        }
    }
}
</script>

<template>
    <BaseHeading1>Iniciar Sesión</BaseHeading1>

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
            <label for="password" class="block mb-2">Contrseña</label>
            <input
                type="password"
                id="password"
                class="w-full border rounded py-2 px-4"
                v-model="user.password"
            >
        </div>
        <button
            type="submit"
            class="py-2 px-4 rounded bg-blue-500 text-white"
        >Ingresar</button>
    </form>
</template>