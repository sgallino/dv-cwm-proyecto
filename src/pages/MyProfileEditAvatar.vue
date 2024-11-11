<script>
import BaseHeading1 from '../components/BaseHeading1.vue';
import { editProfileAvatar } from '../services/auth';

export default {
    name: 'MyProfileEditAvatar',
    components: { BaseHeading1 },
    data() {
        return {
            editData: {
                image: null,
                imagePreview: null,
            },
            editing: false,
        }
    },
    methods: {
        async handleSubmit() {
            if(this.editing) return;

            this.editing = true;

            try {
                await editProfileAvatar(this.image);
            } catch (error) {
                
            }

            this.editing = false;
        },

        handleFileSelection(ev) {
            if(this.editing) return;

            this.image = ev.target.files[0];

            const reader = new FileReader;

            reader.addEventListener('load', () => {
                this.editData.imagePreview = reader.result;
            });

            reader.readAsDataURL(this.image);
        },
    },
}
</script>

<template>
    <BaseHeading1>Editar mi Foto de Perfil</BaseHeading1>

    <div class="flex gap-4 items-start">
        <form
            class="w-1/2"
            action="#"
            @submit.prevent="handleSubmit"
        >
            <div class="mb-4">
                <label for="image" class="block mb-2">Imagen</label>
                <input
                    type="file"
                    id="image"
                    class="w-full border rounded py-2 px-4"
                    :class="{'bg-gray-200': editing}"
                    :aria-readonly="editing"
                    @change="handleFileSelection"
                >
            </div>
            <button
                type="submit"
                class="py-2 px-4 rounded bg-blue-500 text-white"
            >
                {{ !editing ? 'Actualizar mi Foto' : 'Actualizando...' }}
            </button>
        </form>
        <div class="w-1/2">
            <h2 class="mb-4">Previsualización:</h2>

            <div v-if="editData.imagePreview">
                <img :src="editData.imagePreview" alt="">
            </div>
        </div>
    </div>
</template>