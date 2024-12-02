<script setup>
defineProps({
    color: {
        type: String,
        default: '#333',
    }
});
</script>

<template>
    <div class="loader"><span class="sr-only">Cargando...</span></div>
</template>

<style>
.loader {
    --color: v-bind(color);
    width: 50px;
    aspect-ratio: 1;
    border-radius: 50%;
    background:
        radial-gradient(farthest-side, var(--color) 94%, #0000) top/8px 8px no-repeat,
        conic-gradient(#0000 30%, var(--color));
    -webkit-mask: radial-gradient(farthest-side, #0000 calc(100% - 8px), #000 0);
    mask: radial-gradient(farthest-side, #0000 calc(100% - 8px), #000 0);
    animation: l13 1s infinite linear;
}

@keyframes l13 {
    100% {
        transform: rotate(1turn)
    }
}
</style>