<script setup>
import { ref } from 'vue';
import BaseHeading1 from '../components/BaseHeading1.vue';
import BaseInput from '../components/form/BaseInput.vue';
import BaseLabel from '../components/form/BaseLabel.vue';
import BaseTextarea from '../components/form/BaseTextarea.vue';
import LoaderButton from '../components/form/LoaderButton.vue';
import { useAuth } from '../composables/useAuth';

const { loggedUser } = useAuth();
const { saving, newNews, handleSubmit } = useNewsForm(loggedUser);

function useNewsForm(user) {
    const saving = ref(false);
    const newNews = ref({
        title: '',
        content: '',
    });

    async function handleSubmit() {
        saving.value = true;

        try {
            // ...
        } catch (error) {
            // TODO...
        }

        saving.value = false;
    }

    return {
        saving,
        newNews,
        handleSubmit,
    }
}
</script>

<template>
    <BaseHeading1>Noticias</BaseHeading1>

    <h2 class="mb-4 text-2xl">Agregar noticia</h2>
    <form 
        action="#" 
        class="mb-4"
        @submit.prevent="handleSubmit"
    >
        <div class="mb-4">
            <BaseLabel for="title">Título</BaseLabel>
            <BaseInput
                id="title"
                v-model="newNews.title"
            />
        </div>
        <div class="mb-4">
            <BaseLabel for="title">Contenido</BaseLabel>
            <BaseTextarea
                id="content"
                v-model="newNews.content"
            />
        </div>
        <LoaderButton :loading="saving">Agregar Noticia</LoaderButton>
    </form>
</template>