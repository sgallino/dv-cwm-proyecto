<script>
export default {
    name: 'AppNavbar',
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
        </ul>
    </nav>
</template>