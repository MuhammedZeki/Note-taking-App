import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";

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
