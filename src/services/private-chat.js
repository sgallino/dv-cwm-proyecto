import { addDoc, collection, getDocs, limit, onSnapshot, orderBy, query, serverTimestamp, where } from "firebase/firestore";
import { db } from "./firebase";

let documentCache = {};

function getCacheKey(senderId, receiverId) {
    return [senderId, receiverId].sort().join("_");
}

function putInCache(key, value) {
    documentCache[key] = value;
}

function retrieveFromCache(key) {
    return documentCache[key] || null;
}

async function getChatDocument(senderId, receiverId) {
    const cacheKey = getCacheKey(senderId, receiverId);
    const cachedDoc = retrieveFromCache(cacheKey);

    if(cachedDoc) {
        // console.log("Obteniendo la conversación del caché.");
        return cachedDoc
    }

    const users = {
        [senderId]: true,
        [receiverId]: true,
    };

    const chatsRef = collection(db, 'private-chats');

    const chatQuery = query(chatsRef, where('users', '==', users), limit(1));

    const chatSnapshot = await getDocs(chatQuery);
    
    let chatDoc;

    if(chatSnapshot.empty) {
        chatDoc = await addDoc(chatsRef, {
            users: users
        });
    } else {
        chatDoc = chatSnapshot.docs[0];
    }

    // console.log("Conversación obtenida de la base de datos.");
    putInCache(cacheKey, chatDoc);

    return chatDoc;
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
