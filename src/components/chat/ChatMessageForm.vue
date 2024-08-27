<script>
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
                email: '',
                content: '',
            }
        }
    },

    methods: {
        handleSubmit() {
            this.$emit('newMessage', {...this.newMessage});
            this.newMessage.content = '';
        }
    }
}
</script>

<template>
    <form 
        action="#"
        @submit.prevent="handleSubmit"
    >
        <div class="mb-4">
            <label for="user" class="block mb-2">Nombre de Usuario</label>
            <input
                type="text"
                id="user"
                class="w-full border rounded py-2 px-4"
                v-model="newMessage.email"
            >
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