import { addDoc, collection, getDocs, limit, onSnapshot, orderBy, query, serverTimestamp, where } from "firebase/firestore";
import { db } from "./firebase";

// TODO: Cachear el resultado para optimizar performance.
async function getChatDocument(senderId, receiverId) {
    const users = {
        [senderId]: true,
        [receiverId]: true,
    };

    const chatsRef = collection(db, 'private-chats');

    const chatQuery = query(chatsRef, where('users', '==', users), limit(1));

    const chatSnapshot = await getDocs(chatQuery);

    if(chatSnapshot.empty) {
        return await addDoc(chatsRef, {
            users: users
        });
    }

    return chatSnapshot.docs[0];
}

export async function privateChatSaveMessage(senderId, receiverId, content) {
    const chatDoc = await getChatDocument(senderId, receiverId);

    const messagesRef = collection(db, `private-chats/${chatDoc.id}/messages`);

    await addDoc(messagesRef, {
        user_id: senderId,
        content,
        created_at: serverTimestamp(),
    });
}

export async function privateChatSubscribeToMessages(senderId, receiverId, callback) {
    const chatDoc = await getChatDocument(senderId, receiverId);

    const messagesRef = collection(db, `private-chats/${chatDoc.id}/messages`);

    const messagesQuery = query(messagesRef, orderBy('created_at'));

    return onSnapshot(messagesQuery, snapshot => {
        const docs = snapshot.docs.map(doc => {
            return {
                id: doc.id,
                user_id: doc.data().user_id,
                content: doc.data().content,
                created_at: doc.data().created_at?.toDate(),
            }
        });

        callback(docs);
    });
}
