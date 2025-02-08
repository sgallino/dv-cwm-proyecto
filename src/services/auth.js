import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { auth } from "./firebase";
import { createUserProfile, editUserProfile, getUserProfileById } from "./user-profile";
import { getFileURL, uploadFile } from "./storage";

const FIREBASE_ERROR_MESSAGES_MAP = {
    'auth/email-already-in-use': 'El email ya está en uso.',
    'auth/invalid-email': 'El email no tiene un formato correcto.',
    'auth/weak-password': 'La contraseña debe tener al menos 6 caracteres.',
    'auth/user-not-found': 'Usuario no encontrado.',
    'auth/wrong-password': 'Contraseña incorrecta.',
    'auth/invalid-credential': 'Las credenciales ingresadas no coinciden con nuestros registros.',
}

let loggedUser = {
    id: null,
    email: null,
    displayName: null,
    photoURL: null,
    bio: null,
    career: null,
    fullProfileLoaded: false,
}

if(localStorage.getItem('user')) {
    loggedUser = JSON.parse(localStorage.getItem('user'));
}

let observers = [];

onAuthStateChanged(auth, async user => {
    if(user) {
        updateLoggedUser({
            id: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
        });

        const userProfile = await getUserProfileById(user.uid);

        updateLoggedUser({
            ...loggedUser,
            bio: userProfile.bio,
            career: userProfile.career,
            fullProfileLoaded: true,
        });
    } else {
        updateLoggedUser({
            id: null,
            email: null,
            displayName: null,
            photoURL: null,
            bio: null,
            career: null,
        });
        localStorage.removeItem('user');
    }
});

export async function login({email, password}) {
    try {
        await signInWithEmailAndPassword(auth, email, password);
        return true;
    } catch (error) {
        console.error("[auth.js] Error al autenticar: ", error);
        throw FIREBASE_ERROR_MESSAGES_MAP[error.code] || error.message;
    }
}

export async function register({email, password}) {
    try {
        const credentials = await createUserWithEmailAndPassword(auth, email, password);

        await createUserProfile(credentials.user.uid, { email });

        return true;
    } catch (error) {
        console.error("[auth.js] Error al autenticar: ", error);
        throw FIREBASE_ERROR_MESSAGES_MAP[error.code] || error.message;
    }
}

export async function editProfile({ displayName, bio, career }) {
    try {
        const promiseAuth = updateProfile(auth.currentUser, { displayName });
        
        const promiseDb = editUserProfile(loggedUser.id, { displayName, bio, career });

        await Promise.all([promiseAuth, promiseDb]);

        loggedUser = {
            ...loggedUser,
            displayName,
            bio,
            career,
        }
        
        notifyAll();
    } catch (error) {
        console.error("[auth.js editProfile] Error al editar el perfil: ", error);
        throw error;
    }
}

export async function editProfileAvatar(photo) {
    try {
        const filepath = `users/${loggedUser.id}/avatar.jpg`; // TODO: Soportar otros formatos.

        await uploadFile(filepath, photo);

        const photoURL = await getFileURL(filepath);

        const promiseAuth = updateProfile(auth.currentUser, { photoURL });
        const promiseStorage = editUserProfile(loggedUser.id, { photoURL });

        await Promise.all([promiseAuth, promiseStorage]);

        loggedUser.photoURL = photoURL;
        notifyAll();
    } catch (error) {
        console.error("[auth.js editProfileAvatar] Error al editar la imagen  del perfil: ", error);
        throw error;
    }
}

export function logout() {
    return signOut(auth);
}

export function subscribeToAuth(callback) {
    observers.push(callback);

    // console.log('Observer agregado. El stack actual es: ', observers);

    notify(callback);

    return () => observers = observers.filter(obs => obs !== callback);
}

function notify(callback) {
    // console.log('Notificando a un observer...');
    callback({...loggedUser});
}

function notifyAll() {
    observers.forEach(callback => notify(callback));
}

function updateLoggedUser(newData) {
    loggedUser = {
        ...loggedUser,
        ...newData,
    }
    localStorage.setItem('user', JSON.stringify(loggedUser));
    notifyAll();
}
