<script>
import ChatMessageList from './ChatMessageList.vue';
import ChatMessageForm from './ChatMessageForm.vue';
import { db } from '../../services/firebase';
import { collection, addDoc, getDocs, serverTimestamp, query, orderBy } from 'firebase/firestore';

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
            const chatRef = collection(db, 'chat');
            addDoc(chatRef, {
                ...newMessage,
                created_at: serverTimestamp(),
            });
        }
    },

    async mounted() {
        const chatRef = collection(db, 'chat');
        const q = query(chatRef, orderBy('created_at'));
        const snapshot = await getDocs(q);
        this.messages = snapshot.docs.map(doc => {
            return {
                ...doc.data(),
            }
        })
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
