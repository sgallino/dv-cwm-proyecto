<script>
import ChatMessageList from './ChatMessageList.vue';
import ChatMessageForm from './ChatMessageForm.vue';
import { db } from '../../services/firebase';
import { collection, addDoc } from 'firebase/firestore';

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
        async sendMessage(newMessage) {
            const chatRef = collection(db, 'chat');
            addDoc(chatRef, {
                ...newMessage,
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
