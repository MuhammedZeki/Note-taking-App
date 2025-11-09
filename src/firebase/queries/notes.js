import { collection, deleteDoc, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { db } from "../fire/firebase";
import { getAuth } from "firebase/auth";

export const fetchNotes = async ({ queryKey }) => {
    const [_key, userId] = queryKey;
    if (!userId) return [];

    const q = query(collection(db, "notes"), where("userId", "==", userId));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));
};
export const archiveNote = async (noteId) => {
    const noteRef = doc(db, "notes", noteId);
    await updateDoc(noteRef, {
        archived: true,
    });
};

export const fetchArchivedNotes = async ({ queryKey }) => {
    const [_key, userId] = queryKey;
    if (!userId) return [];
    const q = query(collection(db, "notes"), where("userId", "==", userId), where("archived", "==", true));
    const snap = await getDocs(q);
    return snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};
export const restoreNote = async (noteId) => {
    const noteRef = doc(db, "notes", noteId);
    await updateDoc(noteRef, { archived: false });
};

export const deleteNote = async (noteId) => {
    const noteRef = doc(db, "notes", noteId);
    await deleteDoc(noteRef);
};
export const updateNote = async ({ noteId, updatedData }) => {
    const noteRef = doc(db, "notes", noteId);
    await updateDoc(noteRef, {
        ...updatedData,
        updatedAt: new Date(),
    });
};

export const fecthTags = async () => {
    try {
        const auth = getAuth();
        const user = auth.currentUser;

        if (!user) {
            return [];
        }


        const q = query(
            collection(db, "notes"),
            where("userId", "==", user.uid)
        );

        const snapshot = await getDocs(q);

        if (snapshot.empty) {
            return [];
        }


        const allTags = [];

        snapshot.docs.forEach((doc, index) => {
            const data = doc.data();
            console.log(`📄 Doküman ${index + 1}:`, {
                title: data.title,
                tags: data.tags,
                tagsType: typeof data.tags
            });

            if (data.tags) {
                if (Array.isArray(data.tags)) {
                    const validTags = data.tags.filter(tag =>
                        tag && typeof tag === 'string' && tag.trim() !== ''
                    );
                    allTags.push(...validTags);
                } else if (typeof data.tags === 'string') {
                    let parsedTags = [];

                    const match = data.tags.match(/\[\s*Table\/\s*\*(.*?)\*\s*\]/);
                    if (match && match[1]) {
                        parsedTags = [match[1].trim()];
                    } else {
                        parsedTags = data.tags.split(',').map(tag => tag.trim()).filter(tag => tag);
                    }

                    allTags.push(...parsedTags);
                } else {
                    console.log(`❌ Geçersiz tag formatı:`, data.tags);
                }
            } else {
                console.log(`⚠️ Tags alanı yok`);
            }
        });


        const uniqueTags = [...new Set(allTags)];

        return uniqueTags;
    } catch (error) {
        console.error("💥 Tag'ler çekilirken hata:", error);
        throw error;
    }
}
export const fetchTagNotes = async (tagName) => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) return [];
    if (!tagName) return [];

    const q = query(
        collection(db, "notes"),
        where("userId", "==", user.uid),
        where("tags", "array-contains", tagName)
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));
};