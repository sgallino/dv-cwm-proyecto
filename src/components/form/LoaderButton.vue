<script setup>
import BaseLoader from '../BaseLoader.vue';
import BaseButton from './BaseButton.vue';

defineProps({
    loading: {
        type: Boolean,
        default: false,
    }
})
</script>

<template>
    <BaseButton>
        <slot v-if="!loading" />
        <BaseLoader v-else color="#fff" />
    </BaseButton>
</template>