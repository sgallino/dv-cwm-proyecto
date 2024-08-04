<script>
import AppNavbar from './components/AppNavbar.vue';
import AppFooter from './components/AppFooter.vue';

export default {
    name: 'App',
    components: { AppNavbar, AppFooter },
}
</script>

<template>
    <AppNavbar />
    <main class="p-4">
        <router-view />
    </main>
    <AppFooter />
</template>