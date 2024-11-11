<script setup>
defineProps({
    user: {
        type: Object,
        required: true,
}
});
</script>

<template>
    <div class="flex gap-4">
        <div class="w-1/6">
            <img
                :src="user.photoURL || '/imgs/no-image.jpg'"
                alt=""
            >
        </div>
        <div>
            <div class="mb-4">
                {{ user.bio || 'Acá va tu biografía...' }}
            </div>

            <dl class="mb-4">
                <dt class="font-bold">Email</dt>
                <dd class="mb-2">{{ user.email }}</dd>
                <dt class="font-bold">Nombre</dt>
                <dd class="mb-2">{{ user.displayName || 'No especificado' }}</dd>
                <dt class="font-bold">Carrera</dt>
                <dd class="mb-2">{{ user.career || 'No especificado' }}</dd>
            </dl>
        </div>
    </div>
</template>