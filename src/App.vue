<script setup>
import AppNavbar from './components/AppNavbar.vue';
import AppFooter from './components/AppFooter.vue';
import { ref } from 'firebase/storage';
import NotificationBox from './components/NotificationBox.vue';

const feedback = ref({
    message: null,
    type: null,
});
</script>

<template>
    <AppNavbar />
    <main class="container mx-auto p-4">
        <NotificationBox 
            v-if="feedback.message"
            :content="feedback" 
        />

        <router-view />
    </main>
    <AppFooter />
</template>