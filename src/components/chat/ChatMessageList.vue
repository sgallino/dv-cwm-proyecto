<script setup>
defineProps({
    messages: {
        type: Array,
        required: true,
    }
});

function dateToString(date) {
    return Intl.DateTimeFormat('es-AR', {
        year: 'numeric', month: '2-digit', day: '2-digit',
        hour: '2-digit', minute: '2-digit'
    }).format(date).replace(',' ,'');
}
</script>

<template>
    <div class="min-h-[400px] p-4 border rounded">
        <div 
            v-for="message in messages"
            class="mb-4"
        >
            <div class="text-sm">
                <router-link 
                    :to="`/usuario/${message.user_id}`" 
                    class="text-blue-700 underline font-bold"
                >{{ message.email }} dijo:</router-link>
            </div>
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
</template>