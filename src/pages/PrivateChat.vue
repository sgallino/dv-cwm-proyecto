<script setup>
import { useRoute } from 'vue-router';
import BaseHeading1 from '../components/BaseHeading1.vue';
import BaseLoader from '../components/BaseLoader.vue';
import { useAuth } from '../composables/useAuth';
import { useUserProfile } from '../composables/useUserProfile';
import { privateChatSaveMessage, privateChatSubscribeToMessages } from '../services/private-chat';
import { onMounted, ref } from 'vue';

const route = useRoute();

const { loggedUser } = useAuth();
const { user, loading: loadingUser } = useUserProfile(route.params.id);

const { loadingMessages, messages } = usePrivateChatMessages(loggedUser.value.id, route.params.id);
const { newMessage, handleSubmit } = usePrivateChatForm(loggedUser.value.id, route.params.id);

function usePrivateChatMessages(senderId, receiverId) {
    let unsubscribeFromChat = () => {}

    const messages = ref([]);
    const loadingMessages = ref(false);

    onMounted(async () => {
        loadingMessages.value = true;
        unsubscribeFromChat = await privateChatSubscribeToMessages(
            senderId,
            receiverId,
            newMessages => {
                loadingMessages.value = false;
                messages.value = newMessages;
            }
        );
    });

    return {
        messages,
        loadingMessages,
    }
}

function usePrivateChatForm(senderId, receiverId) {
    const newMessage = ref({
        content: '',
    });

    async function handleSubmit() {
        try {
            await privateChatSaveMessage(
                senderId,
                receiverId,
                newMessage.value.content,
            );
            newMessage.value.content = '';
        } catch (error) {
            // TODO
        }
    }

    return {
        newMessage,
        handleSubmit,
    }
}

function dateToString(date) {
    return Intl.DateTimeFormat('es-AR', {
        year: 'numeric', month: '2-digit', day: '2-digit',
        hour: '2-digit', minute: '2-digit'
    }).format(date).replace(',' ,'');
};
</script>

<template>
    <div v-if="loadingUser" class="p-4">
        <BaseLoader />
    </div>
    <template v-else>
        <BaseHeading1>Chat Privado con {{ user.email }}</BaseHeading1>

        <div class="flex flex-col items-start min-h-[400px] p-4 mb-4 border rounded">
            <div 
                v-for="message in messages"
                class="p-4 mb-4 rounded"
                :class="{
                    'bg-gray-200': message.user_id !== loggedUser.id,
                    'bg-green-200': message.user_id === loggedUser.id,
                    'self-end': message.user_id === loggedUser.id,
                }"
            >
                <div>{{ message.content }}</div>
                <div class="text-sm text-slate-700 italic">
                    <template v-if="message.created_at">
                        {{ dateToString(message.created_at) }}
                    </template>
                    <template v-else>
                        Enviando...
                    </template>
                </div>
            </div>
        </div>
        <form 
            action="#"
            class="flex gap-4 items-stretch"
            @submit.prevent="handleSubmit"
        >
            <label for="text" class="sr-only">Mensaje</label>
            <textarea
                type="text"
                id="text"
                class="w-full border rounded py-2 px-4"
                v-model="newMessage.content"
            ></textarea>
            <button
                type="submit"
                class="py-2 px-4 rounded bg-blue-500 text-white"
            >Enviar</button>
        </form>
    </template>
</template>