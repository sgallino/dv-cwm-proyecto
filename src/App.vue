<script setup>
import { ref, provide } from 'vue';
import AppNavbar from './components/AppNavbar.vue';
import AppFooter from './components/AppFooter.vue';
import NotificationBox from './components/NotificationBox.vue';
import { globalFeedbackKey } from './symbols/inject';

const feedback = ref({
    message: null,
    type: null,
    closable: true,
});

function setFeedback(content) {
    feedback.value = {
        closable: true,
        ...content
    };
}

provide(globalFeedbackKey, {setFeedback});
</script>

<template>
    <AppNavbar />
    <main class="container mx-auto p-4">
        <NotificationBox 
            v-if="feedback.message"
            :content="feedback" 
            @close="feedback.message = null"
        />

        <router-view />
    </main>
    <AppFooter />
</template>