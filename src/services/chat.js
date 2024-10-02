import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";

export async function chatSaveMessage({user_id, email, content}) {
    const chatRef = collection(db, 'chat');
    return addDoc(chatRef, {
        user_id: user_id,
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
                    created_at: doc.data().created_at.toDate(),
                }
            }));
        });
}

