<script>
import BaseHeading1 from '../components/BaseHeading1.vue';
import BaseLoader from '../components/BaseLoader.vue';
import { subscribeToAuth } from '../services/auth';
import { privateChatSaveMessage, privateChatSubscribeToMessages } from '../services/private-chat';
import { getUserProfileById } from '../services/user-profile';

let unsubscribeFromAuth = () => {}
let unsubscribeFromChat = () => {}

export default {
    name: 'PrivateChat',
    components: { BaseHeading1, BaseLoader, },
    data() {
        return {
            loggedUser: {
                id: null,
                email: null,
                displayName: null,
                photoURL: null,
                bio: null,
                career: null,
            },

            user: {
                id: null,
                email: null,
                displayName: null,
                photoURL: null,
                bio: null,
                career: null,
            },
            loadingUser: false,

            messages: [],
            loadingMessages: false,

            newMessage: {
                content: '',
            }
        };
    },
    methods: {
        async handleSubmit() {
            this.loading = true;

            try {
                await privateChatSaveMessage(
                    this.loggedUser.id,
                    this.$route.params.id,
                    this.newMessage.content,
                );
                this.newMessage.content = '';
            } catch (error) {
                // TODO
            }

            this.loading = false;
        },
        
        dateToString(date) {
            return Intl.DateTimeFormat('es-AR', {
                year: 'numeric', month: '2-digit', day: '2-digit',
                hour: '2-digit', minute: '2-digit'
            }).format(date).replace(',' ,'');
        },
    },
    mounted() {
        unsubscribeFromAuth = subscribeToAuth(newUserData => this.loggedUser = newUserData);
        this.loadingUser = true;
        getUserProfileById(this.$route.params.id)
            .then(profile => {
                this.loadingUser = false;
                this.user = profile;
            })
        
        this.loadingMessages = true;
        privateChatSubscribeToMessages(
            this.loggedUser.id,
            this.$route.params.id,
            newMessages => {
                this.loadingMessages = false;
                this.messages = newMessages;
            }
        ).then(unsubscribe => {
            unsubscribeFromChat = unsubscribe;
        })
    },
    unmounted() {
        unsubscribeFromAuth();
        unsubscribeFromChat();
    }
}
</script>

<template>
    <div v-if="loadingUser" class="p-4">
        <BaseLoader />
    </div>
    <template v-else>
        <BaseHeading1>Chat Privado con {{ user.email }}</BaseHeading1>

        <div class="min-h-[400px] p-4 mb-4 border rounded">
            <div 
                v-for="message in messages"
                class="mb-4"
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