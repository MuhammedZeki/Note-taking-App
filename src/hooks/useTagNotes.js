import { useQuery } from "@tanstack/react-query";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/fire/firebase";
import { getAuth } from "firebase/auth";

const fetchTagNotes = async (tagName) => {
    try {
        const auth = getAuth();
        const user = auth.currentUser;
        if (!user) {
            return [];
        }
        if (!tagName) {
            return [];
        }
        const q = query(
            collection(db, "notes"),
            where("userId", "==", user.uid),
            where("tags", "array-contains", tagName)
        );
        const snapshot = await getDocs(q);
        if (snapshot.empty) {
            return [];
        }
        const notes = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        notes.sort((a, b) => {
            const dateA = a.updatedAt?.toDate?.() || a.createdAt?.toDate?.() || new Date(0);
            const dateB = b.updatedAt?.toDate?.() || b.createdAt?.toDate?.() || new Date(0);
            return dateB - dateA;
        });
        return notes;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const useTagNotes = (tagName) => {
    return useQuery({
        queryKey: ["tagNotes", tagName],
        queryFn: () => fetchTagNotes(tagName),
        enabled: !!tagName,
    });
};