<script>
export default {
    name: 'AppNavbar',
}
</script>

<template>
    <nav class="navbar">
        <p class="navbar-brand">DV Social</p>

        <ul class="navbar-list">
            <li class="navbar-list-item">
                <router-link to="/" class="navbar-link">Home</router-link>
            </li>
            <li class="navbar-list-item">
                <router-link to="/chat" class="navbar-link">Chat</router-link>
            </li>
            <li class="navbar-list-item">
                <router-link to="/registro" class="navbar-link">Registro</router-link>
            </li>
            <li class="navbar-list-item">
                <router-link to="/iniciar-sesion" class="navbar-link">Iniciar Sesión</router-link>
            </li>
        </ul>
    </nav>
</template>