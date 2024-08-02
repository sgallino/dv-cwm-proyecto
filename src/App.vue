<script>
import Home from './pages/Home.vue';

export default {
    name: 'App',
    components: { Home },
}
</script>

<template>
    <nav>
        <ul>
            <li><router-link to="/">Home</router-link></li>
            <li><router-link to="/chat">Chat</router-link></li>
            <li><router-link to="/registro">Registro</router-link></li>
            <li><router-link to="/iniciar-sesion">Iniciar Sesión</router-link></li>
        </ul>
    </nav>
    <router-view />
</template>