<script setup>
import { onMounted, ref } from 'vue';
import BaseHeading1 from '../components/BaseHeading1.vue';
import BaseInput from '../components/form/BaseInput.vue';
import BaseLabel from '../components/form/BaseLabel.vue';
import BaseTextarea from '../components/form/BaseTextarea.vue';
import LoaderButton from '../components/form/LoaderButton.vue';
import { useAuth } from '../composables/useAuth';
import { createNews, getNews } from '../services/news';
import BaseLoader from '../components/BaseLoader.vue';

const { loggedUser } = useAuth();
const { saving, newNews, handleSubmit } = useNewsForm(loggedUser);
const { loading, news, intersectionElement } = useNews();

function useNews() {
    const loading = ref(true);
    const news = ref([]);
    const intersectionElement = ref(null);
    const loadingMore = ref(false);

    const observer = new IntersectionObserver(entries => {
        entries.forEach(async entry => {
            if(entry.isIntersecting) {
                // Si ya estamos cargando más, no hacemos nada.
                if(loadingMore.value) return;

                loadingMore.value = true;

                try {
                    const moreNews = await getNews(news.value[news.value.length - 1].created_at);
                    news.value = [
                        ...news.value,
                        ...moreNews,
                    ]
                } catch (error) {
                    // TODO...
                    console.error('[News.vue useNews] Error al traer más noticias: ', error);
                }
                
                loadingMore.value = false;
            }
        });
    });

    onMounted(async () => {
        news.value = await getNews();
        loading.value = false;
        observer.observe(intersectionElement.value);
    });

    return {
        loading,
        news,
        intersectionElement,
    }
}

function useNewsForm(user) {
    const saving = ref(false);
    const newNews = ref({
        title: '',
        content: '',
    });

    async function handleSubmit() {
        saving.value = true;

        try {
            await createNews({
                ...newNews.value,
                user_id: user.value.id,
                email: user.value.email,
            });
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

    <h2 class="mb-4 text-2xl">Últimas Noticias</h2>
    <ul 
        v-if="!loading"
        class="flex flex-col gap-4 mb-4"
    >
        <li 
            v-for="aNew in news"
            class="p-4 border rounded"
        >
            <h3 class="mb-4">{{ aNew.title }}</h3>
            <p>{{ aNew.content }}</p>
        </li>
    </ul>
    <BaseLoader v-else />
    
    <div id="intersection-detector" ref="intersectionElement"></div>
    <BaseLoader v-if="loadingMore" />
</template>