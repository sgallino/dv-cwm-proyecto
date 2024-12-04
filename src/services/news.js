import { addDoc, collection, getDocs, limit, orderBy, query, serverTimestamp } from "firebase/firestore";
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

export async function getNews() {
    const newsQuery = query(
        collection(db, 'news'),
        orderBy('created_at', 'desc'),
        limit(4),
    );

    const newsDocs = await getDocs(newsQuery);

    return newsDocs.docs.map(doc => {
        return {
            id: doc.id,
            user_id: doc.data().user_id,
            email: doc.data().email,
            title: doc.data().title,
            content: doc.data().content,
            created_at: doc.data().created_at?.toDate(),
        }
    });
}