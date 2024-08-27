<script>
import ChatMessageList from './ChatMessageList.vue';
import ChatMessageForm from './ChatMessageForm.vue';

export default {
    name: 'ChatSection',
    components: { ChatMessageList, ChatMessageForm },
    data() {
        return {
            messages: [
                {
                    email: 'sara@za.com',
                    content: '¡Hola!',
                },
                {
                    email: 'pepe@trueno.com',
                    content: 'hola sara q tal??',
                },
                {
                    email: 'sara@za.com',
                    content: 'Todo bien Pepe. ¿Y vos?',
                },
            ],
        }
    },

    methods: {
        sendMessage(newMessage) {
            this.messages.push({
                email: newMessage.email,
                content: newMessage.content,
            });
        }
    }
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