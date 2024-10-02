<script>
import { subscribeToAuth } from '../../services/auth';

let unsubscribeFromAuth = () => {};

export default {
    name: 'ChatMessageForm',
    emits: {
        newMessage({ email, content }) {
            return typeof email == 'string' && typeof content == 'string';
        }
    },
    data() {
        return {
            newMessage: {
                content: '',
            },
            loggedUser: {
                id: null,
                email: null,
                displayName: null,
                bio: null,
                career: null,
            }
        }
    },

    methods: {
        handleSubmit() {
            this.$emit('newMessage', {
                user_id: this.loggedUser.id,
                email: this.loggedUser.email,
                content: this.newMessage.content,
            });
            this.newMessage.content = '';
        }
    },
    mounted() {
        unsubscribeFromAuth = subscribeToAuth(newUserData => this.loggedUser = newUserData);
    },
    unmounted() {
        unsubscribeFromAuth();
    }
}
</script>

<template>
    <form 
        action="#"
        @submit.prevent="handleSubmit"
    >
        <div class="mb-4">
            <span class="block mb-2">Nombre de Usuario</span>
            {{ loggedUser.email }}
        </div>
        <div class="mb-4">
            <label for="text" class="block mb-2">Mensaje</label>
            <textarea
                type="text"
                id="text"
                class="w-full border rounded py-2 px-4"
                v-model="newMessage.content"
            ></textarea>
        </div>
        <button
            type="submit"
            class="py-2 px-4 rounded bg-blue-500 text-white"
        >Enviar</button>
    </form>
</template>