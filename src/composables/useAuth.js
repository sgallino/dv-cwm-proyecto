import { onUnmounted, ref } from "vue";
import { subscribeToAuth } from "../services/auth";

export function useAuth() {
    const loggedUser = ref({
        id: null,
        email: null,
        displayName: null,
        photoURL: null,
        bio: null,
        career: null,
    });

    let unsubscribeFromAuth = subscribeToAuth(newUserData => loggedUser.value = newUserData);

    onUnmounted(() => unsubscribeFromAuth());

    return {
        loggedUser,
    }
}

