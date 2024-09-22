import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { auth } from "./firebase";

let loggedUser = {
    id: null,
    email: null,
}

let observers = [];

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
    notifyAll();
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

export async function register({email, password}) {
    try {
        await createUserWithEmailAndPassword(auth, email, password);
        return true;
    } catch (error) {
        console.error("[auth.js] Error al autenticar: ", error);
        throw error;
    }
}

export async function editProfile({ displayName, bio, career }) {
    try {
        await updateProfile(auth.currentUser, { displayName });
    } catch (error) {
        console.error("[auth.js editProfile] Error al editar el perfil: ", error);
        throw error;
    }
}

export function logout() {
    return signOut(auth);
}

export function subscribeToAuth(callback) {
    observers.push(callback);

    notify(callback);
}

function notify(callback) {
    callback({...loggedUser});
}

function notifyAll() {
    observers.forEach(callback => notify(callback));
}