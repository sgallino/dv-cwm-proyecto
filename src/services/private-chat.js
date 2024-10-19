import { addDoc, collection, getDocs, limit, query, serverTimestamp, where } from "firebase/firestore";
import { db } from "./firebase";

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

export async function privateChatSubscribeToMessages() {

}
