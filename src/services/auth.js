import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";

let loggedUser = {
    id: null,
    email: null,
}

onAuthStateChanged(auth, user => {
    if(user) {
        loggedUser = {
            id: user.uid,
            email: user.email,
        }
    } else {
        loggedUser = {
            id: null,
            email: null,
        }
    }
});

export async function login({email, password}) {
    try {
        await signInWithEmailAndPassword(auth, email, password);
        return true;
    } catch (error) {
        console.error("[auth.js] Error al autenticar: ", error);
        throw error;
    }
}
