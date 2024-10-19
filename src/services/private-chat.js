import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";

async function getChatDocument(senderId, receiverId) {
    const chatsRef = collection(db, 'private-chats');

    return await addDoc(chatsRef, {
        users: {
            [senderId]: true,
            [receiverId]: true,
        }
    });
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
