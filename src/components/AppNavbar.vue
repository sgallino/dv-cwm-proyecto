<script>
import { logout, subscribeToAuth } from '../services/auth';

export default {
    name: 'AppNavbar',
    data() {
        return {
            loggedUser: {
                id: null,
                email: null,
            },
        }
    },
    methods: {
        handleLogout() {
            logout();
            this.$router.push({ path: '/iniciar-sesion' });
        }
    },
    mounted() {
        subscribeToAuth(newUserData => this.loggedUser = newUserData);
    }
}
</script>

<template>
    <nav class="flex justify-between items-center h-15 pr-4 bg-gray-100">
        <p class="p-4 text-xl">DV Social</p>

        <ul class="flex gap-2">
            <li>
                <router-link
                    to="/" 
                    class="block p-3 no-underline text-gray-600"
                >
                    Home
                </router-link>
            </li>
            <template v-if="loggedUser.id !== null">
                <li>
                    <router-link
                        to="/noticias" 
                        class="block p-3 no-underline text-gray-600"
                    >
                        Noticias
                    </router-link>
                </li>
                <li>
                    <router-link
                        to="/chat" 
                        class="block p-3 no-underline text-gray-600"
                    >
                        Chat
                    </router-link>
                </li>
                <li>
                    <router-link
                        to="/mi-perfil" 
                        class="block p-3 no-underline text-gray-600"
                    >
                        Mi Perfil
                    </router-link>
                </li>
                <li>
                    <form
                        action="#"
                        @submit.prevent="handleLogout"
                    >
                        <button 
                            type="submit"
                            class="block p-3 no-underline text-gray-600"
                        >{{ loggedUser.email }} (Cerrar Sesión)</button>
                    </form>
                </li>
            </template>
            <template v-else>
                <li>

                    <router-link
                        to="/registro" 
                        class="block p-3 no-underline text-gray-600"
                    >
                        Registro
                    </router-link>
                </li>
                <li>
                    <router-link
                        to="/iniciar-sesion" 
                        class="block p-3 no-underline text-gray-600"
                    >
                        Iniciar Sesión
                    </router-link>
                </li>
            </template>
        </ul>
    </nav>
</template>
