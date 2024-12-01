<script setup>
import { ref } from 'vue';
import { useAuth } from '../../composables/useAuth';

const emit = defineEmits([{
    newMessage({ email, content }) {
        return typeof email == 'string' && typeof content == 'string';
    }
}]);

const { loggedUser } = useAuth();
const { newMessage, handleSubmit } = useChatForm({
    user: loggedUser,
    emit,
});

function useChatForm({user, emit}) {
    const newMessage = ref({
        content: '',
    });

    async function handleSubmit() {
        emit('newMessage', {
            user_id: user.value.id,
            email: user.value.email,
            content: newMessage.value.content,
        });
        newMessage.value.content = '';
    }

    return {
        newMessage,
        handleSubmit,
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