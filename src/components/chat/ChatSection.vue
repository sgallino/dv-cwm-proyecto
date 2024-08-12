<script>
export default {
    name: 'Chat',
    
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

            newMessage: {
                email: '',
                content: '',
            },
        }
    },

    methods: {
        sendMessage() {
            this.messages.push({
                email: this.newMessage.email,
                content: this.newMessage.content,
            });
            this.newMessage.content = "";
        }
    }
}
</script>

<template>
    <div class="flex gap-4">
        <section class="w-9/12">
            <h2 class="sr-only">Lista de mensajes</h2>

            <div class="min-h-[400px] p-4 border rounded">
                <div 
                    v-for="message in messages"
                    class="mb-4"
                >
                    <div class="text-sm"><b>{{ message.email }} dijo:</b></div>
                    <div>{{ message.content }}</div>
                </div>
            </div>
        </section>
        <section class="w-3/12">
            <h2 class="mb-4 text-lg">Enviar un mensaje</h2>

            <form 
                action="#"
                @submit.prevent="sendMessage"
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
        </section>
    </div>
</template>