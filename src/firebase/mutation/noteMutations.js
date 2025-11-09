import { deleteDoc, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "../fire/firebase";
import { toast } from "react-toastify";

export const deleteNoteMutation = (queryClient, userId) => ({
    mutationFn: async (noteId) => {
        const noteRef = doc(db, "notes", noteId);
        await deleteDoc(noteRef);
    },
    onMutate: async (noteId) => {
        await queryClient.cancelQueries(["notes", userId]);

        const previousNotes = queryClient.getQueryData(["notes", userId]);

        queryClient.setQueryData(["notes", userId], (old) => {
            if (!old) return [];
            return old.filter((note) => note.id !== noteId);
        });

        return { previousNotes };
    },
    onError: (err, noteId, context) => {
        toast.error(`Not silinemedi: ${err.message}`);
        if (context?.previousNotes) {
            queryClient.setQueryData(["notes", userId], context.previousNotes);
        }
    },
    onSuccess: () => {
        toast.success("Not başarıyla silindi!");
        queryClient.invalidateQueries(["notes", userId]);
    },
});

export const archiveNoteMutation = (queryClient, userId) => ({
    mutationFn: async (noteId) => {
        const noteRef = doc(db, "notes", noteId);
        await updateDoc(noteRef, {
            archived: true,
            updatedAt: serverTimestamp(),
        });
    },
    onMutate: async (noteId) => {
        await queryClient.cancelQueries(["notes", userId]);
        const previousNotes = queryClient.getQueryData(["notes", userId]);

        queryClient.setQueryData(["notes", userId], (old) => {
            if (!old) return [];
            return old.map((note) =>
                note.id === noteId ? { ...note, archived: true } : note
            );
        });

        return { previousNotes };
    },
    onError: (err, noteId, context) => {
        toast.error(`Arşivleme hatası: ${err.message}`);
        queryClient.setQueryData(["notes", userId], context.previousNotes);
    },
    onSettled: () => {
        queryClient.invalidateQueries(["notes", userId]);
    },
    onSuccess: () => {
        toast.success("Not arşivlendi!");
    },
});

export const updateNoteMutation = (queryClient) => ({
    mutationFn: async ({ noteId, updatedData }) => {
        const noteRef = doc(db, "notes", noteId);
        await updateDoc(noteRef, {
            ...updatedData,
            updatedAt: serverTimestamp(),
        });
    },
    onSuccess: () => {
        toast.success("Not başarıyla güncellendi!");
        queryClient.invalidateQueries(["notes"]);
    },
    onError: (err) => {
        toast.error(`Not güncellenemedi: ${err.message}`);
    },
});

export const restoreNoteMutation = (queryClient, userId) => ({
    mutationFn: async (noteId) => {
        const noteRef = doc(db, "notes", noteId);
        await updateDoc(noteRef, {
            archived: false,
            updatedAt: serverTimestamp(),
        });
    },
    onMutate: async (noteId) => {
        await queryClient.cancelQueries(["notes", userId]);
        const previousNotes = queryClient.getQueryData(["notes", userId]);

        queryClient.setQueryData(["notes", userId], (old) => {
            if (!old) return [];
            return old.map((note) =>
                note.id === noteId ? { ...note, archived: false } : note
            );
        });

        return { previousNotes };
    },
    onError: (err, noteId, context) => {
        toast.error(`Geri yükleme hatası: ${err.message}`);
        queryClient.setQueryData(["notes", userId], context.previousNotes);
    },
    onSettled: () => {
        queryClient.invalidateQueries(["notes", userId]);
    },
    onSuccess: () => {
        toast.success("Not geri yüklendi!");
    },
});