// hooks/useTagNotes.js
import { useQuery } from "@tanstack/react-query";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { getAuth } from "firebase/auth";

const fetchTagNotes = async (tagName) => {
    try {
        const auth = getAuth();
        const user = auth.currentUser;

        if (!user) {
            console.log("❌ Kullanıcı giriş yapmamış");
            return [];
        }

        if (!tagName) {
            console.log("❌ Tag name yok");
            return [];
        }

        console.log("🔄 Tag notları çekiliyor:", tagName);

        // Current user'ın ve belirtilen tag'i içeren notları çek
        const q = query(
            collection(db, "notes"),
            where("userId", "==", user.uid),
            where("tags", "array-contains", tagName)
        );

        const snapshot = await getDocs(q);

        if (snapshot.empty) {
            console.log(`❌ "${tagName}" tag'ine ait note bulunamadı`);
            return [];
        }

        console.log(`📝 "${tagName}" tag'ine ait ${snapshot.docs.length} note bulundu`);

        const notes = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        // Tarihe göre sırala (yeniden eskiye)
        notes.sort((a, b) => {
            const dateA = a.updatedAt?.toDate?.() || a.createdAt?.toDate?.() || new Date(0);
            const dateB = b.updatedAt?.toDate?.() || b.createdAt?.toDate?.() || new Date(0);
            return dateB - dateA;
        });

        return notes;
    } catch (error) {
        console.error("💥 Tag notları çekilirken hata:", error);
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