<script setup>
const model = defineModel();
</script>

<template>
    <textarea
        class="w-full border rounded py-2 px-4"
        v-model="model"
    ></textarea>
</template>