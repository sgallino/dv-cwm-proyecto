<script>
import BaseHeading1 from '../components/BaseHeading1.vue';
import ChatSection from '../components/chat/ChatSection.vue';

export default {
    name: 'Chat',
    components: { BaseHeading1, ChatSection },
}
</script>

<template>
    <BaseHeading1>Chat Global</BaseHeading1>

    <ChatSection />
</template>