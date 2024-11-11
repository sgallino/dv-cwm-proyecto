import { onMounted, onUnmounted, ref } from "vue";
import { subscribeToAuth } from "../services/auth";

export function useAuth() {
    let unsubscribeFromAuth = () => {}

    const loggedUser = ref({
        id: null,
        email: null,
        displayName: null,
        photoURL: null,
        bio: null,
        career: null,
    });

    onMounted(() => {
        unsubscribeFromAuth = subscribeToAuth(newUserData => loggedUser.value = newUserData);
    });

    onUnmounted(() => unsubscribeFromAuth());

    return {
        loggedUser,
    }
}