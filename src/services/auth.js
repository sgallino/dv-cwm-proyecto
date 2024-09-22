import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { auth } from "./firebase";
import { editUserProfile, getUserProfileById } from "./user-profile";

let loggedUser = {
    id: null,
    email: null,
    displayName: null,
    bio: null,
    career: null,
    fullProfileLoaded: false,
}

let observers = [];

onAuthStateChanged(auth, async user => {
    if(user) {
        loggedUser = {
            id: user.uid,
            email: user.email,
            displayName: user.displayName,
        }

        const userProfile = await getUserProfileById(user.uid);

        loggedUser = {
            ...loggedUser,
            bio: userProfile.bio,
            career: userProfile.career,
            fullProfileLoaded: true,
        }
    } else {
        loggedUser = {
            id: null,
            email: null,
            displayName: null,
            bio: null,
            career: null,
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
        const promiseAuth = updateProfile(auth.currentUser, { displayName });
        
        const promiseDb = editUserProfile(loggedUser.id, { displayName, bio, career });

        await Promise.all([promiseAuth, promiseDb]);
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