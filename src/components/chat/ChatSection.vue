<script>
import ChatMessageList from './ChatMessageList.vue';
import ChatMessageForm from './ChatMessageForm.vue';
import { chatSaveMessage, chatSubscribeToMessages } from '../../services/chat';

export default {
    name: 'ChatSection',
    components: { ChatMessageList, ChatMessageForm },
    data() {
        return {
            messages: [],
        }
    },

    methods: {
        async sendMessage(newMessage) {
            chatSaveMessage({...newMessage});
        }
    },

    async mounted() {
        chatSubscribeToMessages(updatedMessages => this.messages = updatedMessages);
    },
}
</script>

<template>
    <div class="flex gap-4">
        <section class="w-9/12">
            <h2 class="sr-only">Lista de mensajes</h2>

            <ChatMessageList :messages="messages" />
        </section>
        <section class="w-3/12">
            <h2 class="mb-4 text-lg">Enviar un mensaje</h2>

            <ChatMessageForm @newMessage="sendMessage" />
        </section>
    </div>
</template>
