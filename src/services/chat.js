import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";

export async function chatSaveMessage({email, content}) {
    const chatRef = collection(db, 'chat');
    return addDoc(chatRef, {
        email: email,
        content: content,
        created_at: serverTimestamp(),
    });
}

export async function chatSubscribeToMessages(callback) {
    const chatRef = collection(db, 'chat');
        const q = query(chatRef, orderBy('created_at'));
        onSnapshot(q, (snapshot) => {
            callback(snapshot.docs.map(doc => {
                return {
                    ...doc.data(),
                }
            }));
        });
}

