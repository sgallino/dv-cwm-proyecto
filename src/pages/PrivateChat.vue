<script>
import BaseHeading1 from '../components/BaseHeading1.vue';
import BaseLoader from '../components/BaseLoader.vue';
import { subscribeToAuth } from '../services/auth';
import { getUserProfileById } from '../services/user-profile';

let unsubscribeFromAuth = () => {}

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
            // TODO
        }
    },
    mounted() {
        unsubscribeFromAuth = subscribeToAuth(newUserData => this.loggedUser);
        this.loadingUser = true;
        getUserProfileById(this.$route.params.id)
            .then(profile => {
                this.loadingUser = false;
                this.user = profile;
            })
    },
    unmounted() {
        unsubscribeFromAuth();
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