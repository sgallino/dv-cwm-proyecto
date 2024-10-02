<script>
export default {
    name: 'ChatMessageList',
    props: {
        messages: {
            type: Array,
            required: true,
        }
    },
    methods: {
        dateToString(date) {
            return Intl.DateTimeFormat('es-AR', {
                year: 'numeric', month: '2-digit', day: '2-digit',
                hour: '2-digit', minute: '2-digit'
            }).format(date).replace(',' ,'');
        }
    }
}
</script>

<template>
    <div class="min-h-[400px] p-4 border rounded">
        <div 
            v-for="message in messages"
            class="mb-4"
        >
            <div class="text-sm"><b>{{ message.email }} dijo:</b></div>
            <div>{{ message.content }}</div>
            <div class="text-sm text-slate-700 italic">{{ dateToString(message.created_at) }}</div>
        </div>
    </div>
</template>