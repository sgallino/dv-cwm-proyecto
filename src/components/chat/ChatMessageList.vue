<script>
export default {
    name: 'ChatMessageList',
    props: {
        messages: {
            type: Array,
            required: true,
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
        </div>
    </div>
</template>