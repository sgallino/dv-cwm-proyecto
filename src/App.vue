<script setup>
import AppNavbar from './components/AppNavbar.vue';
import AppFooter from './components/AppFooter.vue';
</script>

<template>
    <AppNavbar />
    <main class="container mx-auto p-4">
        <router-view />
    </main>
    <AppFooter />
</template>