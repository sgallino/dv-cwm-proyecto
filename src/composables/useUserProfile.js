import { onMounted, ref } from "vue";
import { getUserProfileById } from "../services/user-profile";

export function useUserProfile(id) {
    const user = ref({
        id: null,
        email: null,
        displayName: null,
        bio: null,
        career: null,
    });
    const loading = ref(false);

    onMounted(async () => {
        loading.value = true;

        try {
            user.value = await getUserProfileById(id);
        } catch (error) {
            console.error('[UserProfile.vue mounted] Error al traer el perfil del usuario: ', error);
            // TODO: Manejar el error..
        }

        loading.value = false;
    });

    return {
        user,
        loading,
    }
}