<script setup>
import AppNavbar from './components/AppNavbar.vue';
import AppFooter from './components/AppFooter.vue';
import { ref } from 'vue';
import NotificationBox from './components/NotificationBox.vue';

const feedback = ref({
    message: null,
    type: null,
});

function setFeedback(content) {
    feedback.value = content;
}
</script>

<template>
    <AppNavbar />
    <main class="container mx-auto p-4">
        <NotificationBox 
            v-if="feedback.message"
            :content="feedback" 
        />

        <router-view
            @updateFeedback="setFeedback"
        />
    </main>
    <AppFooter />
</template>