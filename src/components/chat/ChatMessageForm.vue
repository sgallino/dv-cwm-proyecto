<script setup>
import { ref } from 'vue';
import { useAuth } from '../../composables/useAuth';
import BaseButton from '../form/BaseButton.vue';

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
                id="text"
                class="w-full border rounded py-2 px-4"
                v-model="newMessage.content"
            ></textarea>
        </div>
        <BaseButton>Enviar</BaseButton>
    </form>
</template>