import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./firebase";

export async function getUserProfileById(id) {
    const userDoc = doc(db, `users/${id}`);

    const user = await getDoc(userDoc);

    return {
        id: user.id,
        email: user.data().email,
        displayName: user.data().displayName,
        bio: user.data().bio,
        career: user.data().career,
    }
}

export async function editUserProfile(id, data) {
    const userDoc = doc(db, `users/${id}`);

    await setDoc(userDoc, {
        ...data,
    }, { merge: true });
}
