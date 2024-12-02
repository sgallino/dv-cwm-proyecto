<script setup>
const model = defineModel();
</script>

<template>
    <input
        type="text"
        class="w-full border rounded py-2 px-4"
        v-model="model"
    >
</template>