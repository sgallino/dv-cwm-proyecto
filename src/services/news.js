import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";

export async function createNews(data) {
    return await addDoc(
        collection(db, 'news'),
        {
            ...data,
            created_at: serverTimestamp(),
        }
    );
}
