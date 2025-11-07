// src/hooks/useTags.js
import { useQuery } from "@tanstack/react-query";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";

const fetchTags = async () => {
    const snapshot = await getDocs(collection(db, "notes"));
    const allTags = snapshot.docs.flatMap((doc) => doc.data().tags || []);
    const uniqueTags = [...new Set(allTags)]; // tekrar edenleri kaldır
    return uniqueTags;
};

export const useTags = () => {
    return useQuery({
        queryKey: ["tags"],
        queryFn: fetchTags,
    });
};
