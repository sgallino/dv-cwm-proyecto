<script setup>
defineProps({
    content: {
        type: Object,
        required: true,
    },
});
</script>

<template>
    <div
        class="p-4 mb-4 rounded"
        :class="{
            'bg-red-100 text-red-900': content.type === 'error',
            'bg-green-100 text-green-900': content.type === 'success',
        }"
    >
        {{ content.message }}
    </div>
</template>