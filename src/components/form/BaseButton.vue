<script setup>
import { computed } from 'vue';

const props = defineProps({
    variant: {
        type: String,
        default: 'primary',
    }
});

const VARIANT_COLORS = {
    primary: 'bg-blue-500 hover:bg-blue-400 focus:bg-blue-400 active:bg-blue-700',
    success: 'bg-green-500 hover:bg-green-400 focus:bg-green-400 active:bg-green-700',
    error: 'bg-red-500 hover:bg-red-400 focus:bg-red-400 active:bg-red-700',
}

const variantColors = computed(() => VARIANT_COLORS[props.variant]);
</script>

<template>
    <button
        type="submit"
        class="py-2 px-4 rounded text-white"
        :class="variantColors"
    >
        <slot>Enviar</slot>
    </button>
</template>